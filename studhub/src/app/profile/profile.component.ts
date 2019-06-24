import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../model/profile.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getUser();
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
