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

  constructor(snackBar: MatSnackBar, httpVar: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
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
    this.connection.onMessage((message: {param1: string, param2: string, type: string}) => {
      if (message.type == 'NOTIFICATION') {
        thus.snackBar.open(message.param2, message.param1, {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      } else if (message.type == 'CHAT_MESSAGE') {
        if (!this.router.url.includes('/chat/')) {
          let barRef = thus.snackBar.open('You\'ve got a new chat message.', 'Show me', {
            duration: 6000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          barRef.onAction().subscribe(() => {
            this.router.navigateByUrl('chat/' + message.param1);
          });
        }
      }
    });
  }
}
