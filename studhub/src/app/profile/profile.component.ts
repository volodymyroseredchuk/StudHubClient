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
 
}