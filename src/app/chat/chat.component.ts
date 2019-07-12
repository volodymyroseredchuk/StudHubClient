import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component, Directive, DoCheck,
  HostListener,
  Input, OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ChatService, Message} from "../service/chat.service";
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit, AfterViewChecked{
  private chatId: number;
  private messages: Message[] = [];
  private pageSize = 20;
  private page = 1;
  private max = false;
  private ready = false;
  constructor(
    private route: ActivatedRoute,
    private service: ChatService) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatId = params.chatId;
    });
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
    this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).toPromise().then(msgs => {
      msgs.forEach((msg) => {
        msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
        this.messages.push(msg);
      });
    });
  }
  ngAfterViewChecked(): void {
    console.log('init');
    setTimeout(() => {
      if (this.ready) {
        console.log('called');
        const body = document.getElementById('scrollMe');
        body.scrollTop = body.scrollHeight;
        this.ready = false;
      }
    }, 200);
  }

  trackFunc(length, index, item) {
    this.ready = ((this.pageSize - 1) === index);
    return item;
  }

  sendMessage(msgText: string) {
    if (msgText != null && msgText != '') {
      const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
      this.service.sendMessage(msgText, this.chatId, this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub).subscribe((msg) => {
        msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
        this.messages.push(msg);
      });
    }
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
  async onScroll(height, set) {
    this.max = (this.messages.length % this.pageSize != 0);
    if (!this.max) {
      if (height == 0) {
        this.page++;
        const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
        await this.service.getChatMessages(this.chatId, this.getCurrentPaginationSettings()).toPromise().then(msgs => {
          msgs.forEach((msg) => {
            msg.sender.id == userId ? msg.sender = 'message-my' : msg.sender = 'message-their';
            this.messages.unshift(msg);
          });
        }).then(() => {

        });
      }
    }

  }

}

