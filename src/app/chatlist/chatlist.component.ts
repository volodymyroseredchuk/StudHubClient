import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatItem, ChatService} from "../service/chat.service";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SocketService} from "../service/socket.service";
import {AlertService} from "../service/alert.service";
import {EncryptionService} from "../service/encryption.service";

const DEFAULT_PHOTO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqnsGDyoy2fmVfsQXo3twd6UoXqWn2eiJferMx_K3vF4rGW79';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatlistComponent implements OnInit {

  private chatListItems: ChatItem[] = [];
  private connection;
  loading = false;

  constructor(
    private alertService: AlertService,
    private service: ChatService,
    httpVar: HttpClient,
    private router: Router,
    private encryptionService: EncryptionService) {
    this.connection = SocketService.getInstance(httpVar);
  }

  ngOnInit() {
    this.loading = true;
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
    this.service.getChatList(userId).subscribe(
      items => {
        this.loading = false;
        items.forEach((item) => {
        if (item.photoUrl === null) {
          item.photoUrl = DEFAULT_PHOTO_URL;
        }
        if (!item.secret || item.lastMessageText == 'Chat successfully created.') {
          this.chatListItems.push(item);
        } else {
          item.lastMessageText = EncryptionService.decryptMessage(this.encryptionService.getChatSecret(item.chatId), item.lastMessageText);
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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public onMessage(): void {
    this.connection.onMessage((message: {param1: string, param2: string, type: string}) => {
      if (message.type == 'CHAT_MESSAGE') {
        if (this.router.url.includes('/chatlist')) {
          this.chatListItems.forEach((listItem) => {
            if (listItem.chatId.toString() == message.param1) {
              listItem.lastMessageText = message.param2;
            }
          });
        }
      }
    });
  }

}
