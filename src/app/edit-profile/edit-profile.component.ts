import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User;
  fileData: File = null;
  imgURL: any;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
  }


  onSubmit(f: NgForm) {

    if (f.value.firstname !== '') {
      this.user.firstName = f.value.firstname;
    }
    if (f.value.lastname !== '') {
      this.user.lastName = f.value.lastname;
    }
    this.user.emailSubscription = f.value.emailSub;

    alert(this.fileData);

    this.userService.updateUser(this.user).subscribe(() => this.router.navigate(['/profile']));
  }

  onChange(event) {
    this.fileData = event.target.files[0];
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }


}
