import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SocketService} from './service/socket.service';
import {HttpClient} from '@angular/common/http';

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
  }

  public sendMessage(message: {subject_type: string, id: string}): void {
    if (!message) {
      return;
    }
    this.connection.send(message);
  }

  public onMessage(): void {
    const thus = this;
    this.connection.onMessage((message: {subject_type: string, id: string}) => {
      thus._snackBar.open(message.id, message.subject_type, {duration: 3000}).onAction().subscribe(() => {
        thus.sendMessage({subject_type: 'question', id: '1'});
      });
    });
  }
}
