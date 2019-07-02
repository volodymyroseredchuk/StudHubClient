import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {BaseService} from "./base-service";

const SERVER_URL = 'wss://localhost:8080/sock?';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  protected static socket: SocketServiceImpl;

  static getInstance(http: HttpClient): SocketServiceImpl {
    if (SocketService.socket) {
      return SocketService.socket;
    } else {
      SocketService.socket = new SocketServiceImpl(http);
      return SocketService.socket;
    }
  }
}


class SocketServiceImpl extends BaseService {

  private socket;

  private messages;

  private isOpen;
  private token: any;
  private onmessage;

  constructor(http: HttpClient) {
    super(http);
  }

  public initSocket(): void {
    const thus = this;
    thus.messages = [];
    thus.isOpen = false;
    const tokenInfo = this.getDecodedAccessToken(localStorage.getItem('accessToken')); // decode token
    console.log(tokenInfo);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('accessToken')}`
    });
    const options = { headers: headers };
    this.http.get(this.apiUrl + '/getSocketToken?id=' + tokenInfo.sub, options).subscribe(
      data => {
        console.log(data);
        thus.token = data['token'];
        console.log(this.token);
        thus.socket = new WebSocket(SERVER_URL + this.token);

        thus.onOpen();
      },
      err => {
        console.log(err);
      });
  }

  public send(message: { subject_type: string, id: string }): void {

    if (this.isOpen) {
      const json = JSON.stringify(message);
      this.socket.send(json);
    } else {
      this.messages.push(message);
    }

  }

  public onMessage(callback: any): void {

    if (this.isOpen) {
      console.log(this.socket, 'socket');
      this.socket.onmessage = (event) => {
        console.log(event, 'onmessage');
        const message = JSON.parse(event.data);
        callback(message);
      };
    } else {
      this.onmessage = callback;
    }
  }

  public onOpen(): void {
    const thus = this;
    this.socket.onopen = () => {
      thus.isOpen = true;
      thus.sendBufferedMessages();
      this.onMessage(this.onmessage);
    };
  }

  public sendBufferedMessages(): void {
    for (let i = 0; i < this.messages.length; i++) {
      this.send(this.messages[i]);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public close(): void {
    this.socket.close();
  }

}
