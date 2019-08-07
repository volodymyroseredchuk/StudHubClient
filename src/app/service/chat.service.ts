import { Injectable } from '@angular/core';
import {BaseService} from "./base-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatComponent} from "../chat/chat.component";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  messages: Message[] = [];
  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/chat';
  }

  getChatMessages(chatId: number, paginationSettings: string): Observable<Message[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    return this.http.get<Message[]>(`${this.apiUrl}/` + chatId + paginationSettings, options);
  }
  getChatList(userId: number): Observable<ChatItem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    return this.http.get<ChatItem[]>(`${this.apiUrl}/list/` + userId, options);
  }
  getChatHeader(chatId: number, userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    return this.http.get<ChatHeader>(`${this.apiUrl}/header/` + chatId + '/' + userId, options);
  }
  sendMessage(msgText: string, chatId: number, senderId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    let d = new Date();

    d.setHours(d.getHours() + 3);
    return this.http.post<Message>(this.apiUrl, new Message(null, msgText, senderId, d, chatId), options);
  }
  createChat(creatorUserId: number, receiverUserId: number, secret: boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    return this.http.get<any>(this.apiUrl + '/new/' + creatorUserId + '/' + receiverUserId + '/' + secret, options);
  }
}

export class Message {
  constructor(
    public id: number,
    public content: string,
    public sender: any,
    public creationDateTime: any,
    public chat: any) {}
}

export class ChatItem {
  chatId: number;
  photoUrl: string;
  username: string;
  lastMessageText: string;
  secret: boolean;
}

export class ChatHeader {
  name: string;
  photoUrl: string;
}
