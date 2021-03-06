import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user.model';
import { SocketService } from "../service/socket.service";
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();

    SocketService.getInstance(null).close();
  }

  ngOnInit() {
    this.isAuthenticated = this.readLocalStorageValue();
  }

  readLocalStorageValue(): boolean {

    if (localStorage.getItem("accessToken")) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }
}
