import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


const SERVER_URL = 'ws://localhost:9090/sock';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;

  private messages;

  private isOpen;

  public initSocket(): void {
    this.socket = new WebSocket(SERVER_URL);
    this.messages = [];
    this.isOpen = false;
    this.onOpen();
  }

  public send(message: string): void {
    if (this.isOpen) {
      this.socket.send(message);
    } else {
      this.messages.push(message);
    }

  }

  public onMessage(callback: any): void {
    /*return new Observable<string>(observer => {
      this.socket.onmessage((data: String) => observer.next(data));
    });*/
    this.socket.onmessage = callback;
  }

  public onOpen(): void {
    const thus = this;
    this.socket.onopen = () => {
      thus.isOpen = true;
      thus.sendBufferedMessages();
    };
  }

  public sendBufferedMessages(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.messages.length; i++) {
      this.send(this.messages[i]);
    }
  }

  // public onEvent(event: Event): Observable<any> {
  //   return new Observable<Event>(observer => {
  //     this.socket.onEvent(event);
  //   });
  // }
}
