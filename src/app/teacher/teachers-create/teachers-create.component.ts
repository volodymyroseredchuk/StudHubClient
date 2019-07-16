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
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Feedback} from '../../model/feedback.model';
import {FeedbackService} from '../../service/feedback.service';

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

  feedbackCreateForm: FormGroup;
  loading = false;
  submitted = false;

  private universities: University[];
  private selectedUniversityName: "None";
  private selectedUniversity: University;
  options: string[];
  filteredOptions: Observable<string[]>;


  constructor(private teacherService: TeacherService, private router: Router, private universityService: UniversityService) {
    this.teacher = new Teacher();
   }
  ngOnInit() {
//     this.feedbackCreateForm = this.formBuilder.group({
//       body: ['', Validators.required]
//     });
//   }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    if (input) {
      input.value = '';
    }
  }

  goToAllTeachers() {
    this.router.navigate(['/teachers']);
  }

  onSubmit(){
    this.teacherService.newTeacher(this.teacher)
      .subscribe(result => this.goToAllTeachers());
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

}

// @Component({
//   selector: 'app-feedback-create',
//   templateUrl: './feedback-create.component.html',
//   styleUrls: ['./feedback-create.component.scss']
// })
// export class FeedbackCreateComponent implements OnInit {
//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//
//   feedback: Feedback;
//
//   feedbackCreateForm: FormGroup;
//   loading = false;
//   submitted = false;
//
//   constructor(private feedbackService: FeedbackService, private router: Router, private formBuilder: FormBuilder) {
//     this.feedback = new Feedback();
//   }
//
//   ngOnInit() {
//     this.feedbackCreateForm = this.formBuilder.group({
//       body: ['', Validators.required]
//     });
//   }
//
//   // convenience getter for easy access to form fields
//   get f() {
//     return this.feedbackCreateForm.controls;
//   }
//
//   goToAllFeedbacks() {
//     this.router.navigate(['/feedback']);
//   }
//
//   onSubmit() {
//     this.submitted = true;
//
//     // stop here if form is invalid
//     if (this.feedbackCreateForm.invalid) {
//       return;
//     }
//
//     this.feedbackService.createFeedback(this.feedback)
//         .subscribe(result => this.goToAllFeedbacks());
//   }
// }

