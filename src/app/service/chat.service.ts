import { Injectable } from '@angular/core';
import {BaseService} from "./base-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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
}

export class Message {
  id: number;
  content: string;
  sender: any;
  creationDateTime: any;
  chat: any;
}

export class ChatItem {
  chatId: number;
  photoUrl: string;
  username: string;
  lastMessageText: string;
}
