import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ChatService, Message} from "../service/chat.service";
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute, Router} from "@angular/router";
import {SocketService} from "../service/socket.service";
import {HttpClient} from "@angular/common/http";

const DEFAULT_PHOTO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqnsGDyoy2fmVfsQXo3twd6UoXqWn2eiJferMx_K3vF4rGW79';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  private chatId: number;
  private messages: Message[] = [];
  private pageSize = 20;
  private page = 1;
  private moreMessages = true;
  private scrollUsed = false;
  private lastScrollHeight = 0;
  private lastHeight = 0;
  private receiver;
  private photoUrl = DEFAULT_PHOTO_URL;
  private connection;
  private gotMessagesCount = 0;
  constructor(
    private route: ActivatedRoute,
    private service: ChatService,
    httpVar: HttpClient,
    private router: Router) {
    this.connection = SocketService.getInstance(httpVar);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatId = params.chatId;
    });
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
    this.service.getChatHeader(this.chatId, userId).subscribe((msgHeader) => {
      this.receiver = msgHeader.name;
      if (msgHeader.photoUrl === null || msgHeader.photoUrl === undefined) {
        this.photoUrl = DEFAULT_PHOTO_URL;
      } else {
        this.photoUrl = msgHeader.photoUrl;
      }
    });
    this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).toPromise().then(msgs => {
      this.gotMessagesCount += msgs.length;
      msgs.forEach((msg) => {
        msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
        this.messages.push(msg);
      });
    });

    this.onMessage();
  }



  sendMessage(msgText: string) {
    if (msgText != null && msgText != '') {
      const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
      this.service.sendMessage(msgText, this.chatId, this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub)
        .subscribe((msg) => {
        msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
        this.messages.push(msg);
      });
    }
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
            msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
            this.messages.unshift(msg);
          });
        }).then(() => {
          this.scrollUsed = true;
        });
      }
    }

  }

  public onMessage(): void {
    this.connection.onMessage((message: {param1: string, param2: string, type: string}) => {
      if (message.type == 'CHAT_MESSAGE') {
        if (this.router.url.includes('/chat/')) {
          this.messages.push(new Message(null, message.param2, 'message-their', null, null));
          this.gotMessagesCount++;
        }
      }
    });
  }

}

