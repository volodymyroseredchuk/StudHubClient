import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatService, Message} from "../service/chat.service";
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {

  private chatId: number;
  private messages: Message[] = [];
  private pageSize = 5;
  private page = 1;
  private chatBody = '';

  static generateMyMessage(content: string): string {
    return (
      '<div class="message-my">\n' +
      '<div class="message-content">' + content + '</div>\n' +
      '<div class="message-triangular"></div>\n' +
      '</div>'
    );
  }
  static generateTheirMessage(content: string): string {
    return (
      '<div class="message-their">\n' +
      '<div class="message-content">' + content + '</div>\n' +
      '<div class="message-triangular"></div>\n' +
      '</div>'
    );
  }
  constructor(
    private route: ActivatedRoute,
    private service: ChatService) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatId = params.chatId;
    });
    const body = document.getElementsByClassName('chat-container__body')[0];
    this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).subscribe(msgs => {
      msgs.forEach((msg) => {
        this.messages.push(msg);
      });
      this.printMessages();
      body.scrollTop = body.scrollHeight;
    });
  }
  printMessages() {
    this.messages.forEach((msg) => {
      const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
      if (userId == msg.sender.id) {
        this.chatBody += ChatComponent.generateMyMessage(msg.content);
      } else {
        this.chatBody += ChatComponent.generateTheirMessage(msg.content);
      }
    });
  }

  getCurrentPaginationSettings(): string {
    return '?page=' + (this.page - 1) + '&size=' + this.pageSize;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}

