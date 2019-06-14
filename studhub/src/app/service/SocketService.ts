import { Injectable } from '@angular/core';

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

  public send(message: {name: string, text: string}): void {

    if (this.isOpen) {
      const json = JSON.stringify(message);
      this.socket.send(json);
    } else {
      this.messages.push(message);
    }

  }

  public onMessage(callback: any): void {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      callback(message);
    };
  }

  public onOpen(): void {
    const thus = this;
    this.socket.onopen = () => {
      thus.isOpen = true;
      thus.sendBufferedMessages();
    };
  }

  public sendBufferedMessages(): void {
    for (let i = 0; i < this.messages.length; i++) {
      this.send(this.messages[i]);
    }
  }
}
