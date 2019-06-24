import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res
    });
  }

  public getUser() {
    let url = "http://localhost:8080/profile/my";
    this.http.get<Profile>(url, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('jwt-token'))
    })
      .subscribe(
        res => {
          this.profile = res;
        },
        err => {
          alert('You are not logged in!');
          this.router.navigate(['/signin'])
        }
      );
  }

}

