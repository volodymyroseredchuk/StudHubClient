import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatItem, ChatService} from "../service/chat.service";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";


@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatlistComponent implements OnInit {

  private chatListItems: ChatItem[] = [];
  private chatListBody = '';

  static generateChatListItem(item: ChatItem): string {
    let photo: string;
    item.photoUrl === null ? photo = 'data:image/png;base64,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' : photo = item.photoUrl;
    return (
      '<div class="chat-preview" (click)="redirect(' + item.chatId + ')">\n' +
      '    <div class="chat-preview__img">\n' +
      '      <img class="chat-preview__img-img" src="' + photo + '" alt="">\n' +
      '    </div>\n' +
      '    <div class="chat-preview__info">\n' +
      '      <div class="chat-preview__name">\n' +
      item.username +
      '      </div>\n' +
      '      <div class="chat-preview__last-message">\n' +
      item.lastMessageText +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>'
    );
  }
  constructor(
    private service: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    const body = document.getElementsByClassName('chat-container__body')[0];
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
    this.service.getChatList(userId).subscribe(items => {
      items.forEach((item) => {
        this.chatListItems.push(item);
      });
      this.printItems();
    });
  }
  printItems() {
    this.chatListItems.forEach((item) => {
      this.chatListBody += ChatlistComponent.generateChatListItem(item);
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public redirect(chatId: number) {
    window['customRedirect'] = (chatId) => {
      console.log('used!!!!!!!!!!');
      this.router.navigate(['/chat']);
    };
  }

}
