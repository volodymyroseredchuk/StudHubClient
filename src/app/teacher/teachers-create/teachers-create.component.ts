import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Router} from '@angular/router';
import {Teacher} from '../../model/teacher.model';
import {TeacherService} from '../../service/teacher.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Feedback} from '../../model/feedback.model';
import {FeedbackService} from '../../service/feedback.service';
import {FileService} from '../../service/file.service';

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.scss']
})
export class TeachersCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  myControl = new FormControl();
  teacher: Teacher;
  fileData: File = null;
  imgURL: any;

  feedbackCreateForm: FormGroup;
  loading = false;
  submitted = false;

  private universities: University[];
  private selectedUniversityName: "None";
  private selectedUniversity: University;
  options: string[];
  filteredOptions: Observable<string[]>;


  teacherForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
  });


  constructor(private teacherService: TeacherService, private fileService: FileService, private router: Router,
              private universityService: UniversityService) {
    this.teacher = new Teacher();
  }


  ngOnInit() {

    // this.teacherForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   body: ['', Validators.required]
    // });
    this.teacherService.newTeacher(this.teacher).subscribe(res => {
      this.teacher = res;
      this.teacherForm.patchValue({
        firstname: res.firstName,
        lastname: res.lastName,
      });
    });

    this.getUniversities();
  }
  // ngOnInit() {
  // }
  //
  // addTag(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //
  //
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  goToAllTeachers() {
    this.router.navigate(['/teachers']);
  }


  onSubmit() {
    this.submitted = true;

    // // stop here if form is invalid
    // if (this.questionCreateForm.invalid) {
    //   return;
    // }
    this.teacherService.newTeacher(this.teacher)
        .subscribe(result => this.goToAllTeachers());
  }

  get f() { return this.teacherForm.controls; }

  // onSubmit(f: NgForm) {
  //   if (f.value.firstname.length < 3 || f.value.lastname.length < 3) {
  //     return;
  //   }
  //
  //   this.teacher.firstName = f.value.firstname;
  //   this.teacher.lastName = f.value.lastname;
  //   if (this.selectedUniversity !== undefined) {
  //     this.teacher.university = this.selectedUniversity;
  //   }
  //
  //   this.setImageUrl();
  // }
  //
  // async setImageUrl() {
  //   await this.fileService.uploadFile(this.fileData).toPromise().then(res => {
  //     this.teacher.imageUrl = res.message;
  //   }).then(() => {
  //     this.teacherService.updateTeacher(this.teacher).subscribe(() => this.router.navigate(['/teachers']));
  //   })
  // }


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
      console.log(this.options);
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

