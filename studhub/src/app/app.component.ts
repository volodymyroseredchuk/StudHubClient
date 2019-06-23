import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SocketService} from './service/socket.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studhub';
  private snackBar: MatSnackBar;
  private connection: any;



  constructor(snackBar: MatSnackBar, httpVar: HttpClient) {
    this.snackBar = snackBar;
    this.connection = SocketService.getInstance(httpVar);
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt-token')) {
      this.init();
    }
  }
  public init() {
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
      thus.snackBar.open(message.id, message.subject_type, {duration: 3000});
    });
  }
}
