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
  constructor(
    private service: ChatService,
  ) { }

  ngOnInit() {
    const userId: number = this.getDecodedAccessToken(localStorage.getItem('accessToken')).sub; // decode token
    this.service.getChatList(userId).subscribe(items => {
      items.forEach((item) => {
        if (item.photoUrl === null) item.photoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqnsGDyoy2fmVfsQXo3twd6UoXqWn2eiJferMx_K3vF4rGW79';
        this.chatListItems.push(item);
      });
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
