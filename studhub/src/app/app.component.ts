import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SocketService} from './service/SocketService';
import {HttpClient, HttpHandler} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studhub';
  private _snackBar: MatSnackBar;
  private connection: SocketService;



  constructor(_snackBar: MatSnackBar, httpVar: HttpClient) {
    this._snackBar = _snackBar;
    this.connection = new SocketService(httpVar);
  }

  ngOnInit(): void {
    this.connection.initSocket();
    this.onMessage();
    this.sendMessage({name: 'admin', text: 'Message from angular'});
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
