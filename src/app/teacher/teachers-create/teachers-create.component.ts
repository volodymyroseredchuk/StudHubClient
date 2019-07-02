import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Router } from '@angular/router';
import {Teacher} from "../../model/teacher.model";
import {TeacherService} from "../../service/teacher.service";

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


  teacher: Teacher;

  constructor(private teacherService: TeacherService, private router: Router) {
    this.teacher = new Teacher();
   }

  ngOnInit() {
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
}
