import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SocketService} from './service/SocketService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studhub';
  // tslint:disable-next-line:variable-name
  private _snackBar: MatSnackBar;
  private connection: SocketService;
  // private socketService: SocketService;
  // private ioConnection: any;
  // tslint:disable-next-line:variable-name


  constructor(_snackBar: MatSnackBar) {
    this._snackBar = _snackBar;
    this.connection = new SocketService();
   // this.socketService = socketService;
  }

  ngOnInit(): void {
    this.connection.initSocket();
    this.onMessage();
    this.sendMessage('message from angular');
    // this.initIoConnection();
    // this.sendMessage('Connected?');
  }
  private initIoConnection(): void {
    // this.socketService.initSocket();

    /*this.ioConnection = this.socketService.onMessage((message: string) => {
      this._snackBar.open(message, 'Got ya!');
      this.sendMessage('Got your message');
    });
      .subscribe((message: string) => {

      });*/
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.connection.send(message);

    // this.socketService.send('Message from Angular');
  }

  public onMessage(): void {
    this.connection.onMessage((event: any) => {
      console.log(event);
      const s = JSON.parse(event.data);
      this._snackBar.open(s.text, s.name);
    });
  }

}
