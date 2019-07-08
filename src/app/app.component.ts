import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from './service/socket.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studhub';
  private snackBar: MatSnackBar;
  private connection: any;

  constructor(snackBar: MatSnackBar, httpVar: HttpClient, private authenticationService: AuthenticationService) {
    this.snackBar = snackBar;
    this.connection = SocketService.getInstance(httpVar);
  }

  ngOnInit(): void {
    if (location.protocol === 'http:') {
      window.location.href = location.href.replace('http', 'https');
    }
    if (localStorage.getItem('accessToken')) {
      this.init();
    }
  }
  public init() {
    if (localStorage.getItem('refreshToken')) {
      this.authenticationService.verifyToken(localStorage.getItem("accessToken")).toPromise().catch(error => {
        console.log("refresh in app");
        if (localStorage.getItem('refreshToken')) {
          this.authenticationService.refreshToken();
        }
      });
    }

    this.connection.initSocket();
    this.onMessage();
  }

  public sendMessage(message: { subject_type: string, id: string }): void {
    if (!message) {
      return;
    }
    this.connection.send(message);
  }

  public onMessage(): void {
    const thus = this;
    this.connection.onMessage((message: {subject_type: string, id: string}) => {
      thus.snackBar.open(message.id, message.subject_type, {duration: 6000, horizontalPosition: 'right', verticalPosition: 'bottom'});
    });
  }
}
