import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { University } from '../model/university.model';
import { UniversityService } from '../service/university.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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


  constructor(private userService: UserService, private universityService: UniversityService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
    });

    this.getUniversities();
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
    if (this.selectedUniversity != undefined) {
      this.user.university = this.selectedUniversity;
    }

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

}
