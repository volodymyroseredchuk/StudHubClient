import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';
import { University } from '../model/university.model';
import { UniversityService } from '../service/university.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FileService } from '../service/file.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User;
  fileData: File = null;
  imgURL: any;
  private universities: University[];
  private selectedUniversityName: "None";
  private selectedUniversity: University;
  options: string[];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    emailSub: new FormControl()
  });

  constructor(
    private userService: UserService,
    private fileService: FileService,
    private universityService: UniversityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
      this.userForm.patchValue({
        firstname: res.firstName,
        lastname: res.lastName,
        emailSub: res.emailSubscription
      });
    });

    this.getUniversities();
  }

  get f() { return this.userForm.controls; }

  onSubmit(f) {
    if (f.value.firstname.length < 3 || f.value.lastname.length < 3) {
      return;
    }

    this.user.firstName = f.value.firstname;
    this.user.lastName = f.value.lastname;
    this.user.emailSubscription = f.value.emailSub;
    if (this.selectedUniversity != undefined) {
      this.user.university = this.selectedUniversity;
    }

    if (this.croppedImage !== '') {
      this.setImageUrl();
    } else {
      this.userService.updateUser(this.user).subscribe(() => this.router.navigate(['/profile']));
    }
  }

  async setImageUrl() {
    await this.fileService.uploadFile(this.dataURLtoFile(this.croppedImage, 'avatar.png')).toPromise().then(res => {
      this.user.imageUrl = res.message;
    }).then(() => {
      this.userService.updateUser(this.user).subscribe(() => this.router.navigate(['/profile']));
    })
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async getUniversities() {
    this.options = [];
    await this.universityService.getAllUniversities().toPromise().then(data => {
      console.log(data);
      this.universities = data;
    }).then(() => {
      this.universities.forEach(university => {
        this.options.push(university.name);
      });
    }).then(() => {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  getUniverFromName(option: string) {
    this.selectedUniversity = this.universities.find(university => {
      return university.name === option;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady() {
  }
  loadImageFailed() {
  }

}
