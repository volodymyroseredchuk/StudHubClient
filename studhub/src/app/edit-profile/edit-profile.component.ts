import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res
    });
  }

  onSubmit(f: NgForm) {
    this.user.firstName = f.value.firstname;
    this.user.lastName = f.value.lastname;
    this.user.email = f.value.email;

    this.userService.updateUser(this.user).subscribe(res => {
      this.user = res
    });;
  }

}
