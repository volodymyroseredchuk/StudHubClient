import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ChatService, Message} from '../service/chat.service';
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../service/socket.service';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../service/alert.service';
import {MatSnackBar} from '@angular/material';
import { EncryptionService } from '../service/encryption.service';

const DEFAULT_PHOTO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqnsGDyoy2fmVfsQXo3twd6UoXqWn2eiJferMx_K3vF4rGW79';

// TODO: fix secret and regular chat header; fix messages load for regular and secret chat; fix secret generator for regular
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  chatId: number;
  messages: Message[] = [];
  private pageSize = 20;
  private page = 1;
  private moreMessages = true;
  scrollUsed = false;
  private lastScrollHeight = 0;
  private lastHeight = 0;
  private receiver;
  photoUrl = DEFAULT_PHOTO_URL;
  private connection;
  private gotMessagesCount = 0;
  loading = false;
  // E2EE
  private secret = false;
  private publicSent = false;
  private encryptionKey = null;
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private service: ChatService,
    httpVar: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private encryptionService: EncryptionService) {
    this.connection = SocketService.getInstance(httpVar);
  }


  ngOnInit() {
      this.loading = true;
      this.route.params.subscribe(params => {
        this.chatId = params.chatId;
        this.secret = (params.secret == 'true');
      });
      if (this.secret == true) {
        console.log('initSecret()');
        this.initSecret().then(() => {
          this.init();
        });
      } else {
        this.init();
      }
  }
  private init() {
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub;
    this.service.getChatHeader(this.chatId, userId).subscribe(
      (msgHeader) => {
        this.receiver = msgHeader.name;
        if (msgHeader.photoUrl === null || msgHeader.photoUrl === undefined) {
          this.photoUrl = DEFAULT_PHOTO_URL;
        } else {
          this.photoUrl = msgHeader.photoUrl;
        }
      },
      error => {
        console.log(error);
        this.alertService.error(error);
      });
    this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).toPromise().then(
      msgs => {
        this.gotMessagesCount += msgs.length;
        this.loading = false;
        msgs.forEach((msg) => {
          if (msg.sender == null || msg.sender === '') {
            msg.sender = 'message-both';
            this.messages.push(msg);
          } else {
            msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
            if (this.secret == true) {
              console.log('decrypting message');
              msg.content = EncryptionService.decryptMessage(this.encryptionKey, msg.content);
              this.messages.push(msg);
            } else {
              console.log('goin to show message as it is');
              this.messages.push(msg);
            }
          }
        });
      },
      error => {
        this.loading = false;
        console.log(error);
        this.alertService.error(error);
      });
    this.onMessage();
  }
  private async initSecret() {
    console.log('initSecret()');
    if (this.encryptionKey === undefined || this.encryptionKey === null) {
      this.encryptionKey = await this.encryptionService.getChatSecret(this.chatId);
      if (this.encryptionKey === undefined) {
        const pair = await this.encryptionService.generateKeyPair();
        this.encryptionService.chatPairMap.set(this.chatId, pair);
        this.sendSocketMessage(this.chatId, pair.publicKey, 'ENCRYPTION_PUBLIC_KEY_EXCHANGE');
        this.publicSent = true;
      }
    }
  }
  send(msg: string) {
    if (this.secret == true) {
      this.sendSecretMessage(msg);
    } else {
      this.sendCommonMessage(msg);
    }
  }
  sendCommonMessage(msgText: string) {
      if (msgText != null && msgText != '' && msgText.trim() != '') {
        const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
        this.service.sendMessage(msgText.trim(),
          this.chatId, this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub)
          .subscribe(
            (msg) => {
                msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
                this.messages.push(msg);
            },
            error => {
              console.log(error);
              this.alertService.error(error);
            });
      }
  }
  sendSecretMessage(msgText: string) {
    this.initSecret().then(() => {
      if (msgText != null && msgText != '' && msgText.trim() != '') {
        const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
        this.service.sendMessage(EncryptionService.encryptMessage(this.encryptionKey, msgText.trim()),
          this.chatId, this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub)
          .subscribe(
            (msg) => {
                msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
                msg.content = EncryptionService.decryptMessage(this.encryptionKey, msg.content);
                this.messages.push(msg);
            },
            error => {
              console.log(error);
              this.alertService.error(error);
            });
      }
    });
  }
  getCurrentPaginationSettings(): string {
    return '?offset=' + this.gotMessagesCount + '&size=' + this.pageSize;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  async onScroll(height, set) {
    if (this.moreMessages) {
      if (height == 0) {
        this.lastScrollHeight = set;
        this.lastHeight = height;
        this.page++;
        const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
        await this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).toPromise().then(msgs => {
          if (msgs.length < 1) {
            this.moreMessages = false;
          }
          this.gotMessagesCount += msgs.length;
          msgs.forEach((msg) => {
            if (msg.sender == null || msg.sender === '') {
              msg.sender = 'message-both';
            } else {
              msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
            }
            if (this.secret == false) {
              this.messages.unshift(msg);
            } else {
              msg.content = EncryptionService.decryptMessage(this.encryptionKey, msg.content);
              this.messages.unshift(msg);
            }
          });
        },
          error => {
            console.log(error);
            this.alertService.error(error);
          }).then(() => {
          this.scrollUsed = true;
        });
      }
    }
    this.cdRef.detectChanges();
  }
  public onMessage(): void {
    this.connection.onMessage((message: {param1: string, param2: string, type: string}) => {
      if (message.type == 'CHAT_MESSAGE') {
        if (this.router.url.includes('/chat/')) {
            if (this.secret == false) {
              this.messages.push(new Message(null, message.param2, 'message-their', null, null));
            } else {
              this.initSecret().then(() => {
                message.param2 = EncryptionService.decryptMessage(this.encryptionKey, message.param2);
                this.messages.push(new Message(null, message.param2, 'message-their', null, null));
              });
            }
            this.gotMessagesCount++;
        }
      } else if (message.type == 'STATUS') {
        if (message.param2 == 'OK') {
          this.snackBar.open('Invite sent successfully.', 'Ok');
        } else {
          this.snackBar.open('Invite sent unsuccessfully. User is offline', 'Ok');
          this.router.navigateByUrl('/chatlist');
        }
      }

    });
  }
  private jsonToStr(json): string {
    let stringified = JSON.stringify(json);
    stringified = '"' + stringified + '"';
    return stringified;
  }
  async sendSocketMessage(parameter1, parameter2, msgType: string) {
    const exportedKey = await crypto.subtle.exportKey('jwk', parameter2);
    this.connection.send({param1: parameter1, param2: this.jsonToStr(exportedKey), type: msgType});
  }

}

