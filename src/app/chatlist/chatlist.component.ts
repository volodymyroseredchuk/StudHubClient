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

  chatListItems: ChatItem[] = [];
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
        this.putItems(items);
    },
      error => {
        this.loading = false;
        console.log(error);
        this.alertService.error(error);
      });
    this.onMessage();
  }
  private async putItems(items) {
    this.loading = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].photoUrl === null) {
        items[i].photoUrl = DEFAULT_PHOTO_URL;
      }
      if (items[i].secret == false || items[i].lastMessageText == 'Chat successfully created.') {
        this.chatListItems.push(items[i]);
      } else {
        await this.decryptMesssage(items[i]).then((modifiedItem) => {
          this.chatListItems.push(modifiedItem);
        });
      }
    }
  }
  private async decryptMesssage(item) {
    item.lastMessageText = EncryptionService.decryptMessage(
      await this.encryptionService.getChatSecret(item.chatId), item.lastMessageText);
    return item;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  // TODO: fix online new message update un chat list
  public onMessage() {
    this.connection.onMessage((message: {param1: string, param2: string, type: string}) => {
      if (message.type == 'CHAT_MESSAGE') {
        if (this.router.url.includes('/chatlist')) {
          const index = this.chatListItems.findIndex((el) => {
            return el.chatId.toString() == message.param1;
          });
          const msg = JSON.parse(message.param2);
          const deleted = this.chatListItems.splice(index, 1);
          const deletedElement = deleted[0];
          if (deletedElement.secret == false) {
            deletedElement.lastMessageText = msg.content;
            console.log('deleted with secret false');
            console.log(deletedElement);
            this.chatListItems.unshift(deletedElement);
          } else {
            deletedElement.lastMessageText = msg.content;
            console.log('deleted with secret true');
            this.decryptMesssage(deletedElement).then((el) => {
              console.log(el);
              this.chatListItems.unshift(el);
            });
          }
          /*this.chatListItems.forEach((listItem, listItemIndex) => {
            if (listItem.chatId.toString() == message.param1) {
              this.chatListItems.splice(listItemIndex, 1);
              listItem.lastMessageText = message.param2;
              if (listItem.secret == false) {
                this.chatListItems.unshift(listItem);
              } else {
                this.decryptMesssage(listItem).then((modifiedItem) => {
                  this.chatListItems.unshift(modifiedItem);
                });
              }
            }
          });*/
        }
      }
    });
  }

}
