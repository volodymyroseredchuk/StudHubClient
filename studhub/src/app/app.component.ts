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
  private _snackBar: MatSnackBar;
  private connection: SocketService;



  constructor(_snackBar: MatSnackBar) {
    this._snackBar = _snackBar;
    this.connection = new SocketService();
  }

  ngOnInit(): void {
    this.connection.initSocket();
    this.onMessage();
    this.sendMessage({name: 'Message from angular', text: 'admin'});
  }

  public sendMessage(message: {name: string, text: string}): void {
    if (!message) {
      return;
    }
    this.connection.send(message);
  }

  public onMessage(): void {
    this.connection.onMessage((message: {name: string, text: string}) => {
      console.log(event);
      this._snackBar.open(message.text, message.name);
    });
  }

}
