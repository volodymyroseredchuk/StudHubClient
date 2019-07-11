import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Router } from '@angular/router';

import {University} from "../../model/university.model";
import {UniversityService} from "../../service/university.service";

import {FormBuilder, FormControl} from "@angular/forms";


@Component({
  selector: 'app-universities-create',
  templateUrl: './universities-create.component.html',
  styleUrls: ['./universities-create.component.scss']
})
export class UniversitiesCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  myControl = new FormControl();
  university: University;

  private universities: University[];




  constructor( private router: Router, private universityService: UniversityService) {
    this.university = new University();




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
    this.router.navigate(['/universities']);
  }

  onSubmit() {

    this.universityService.newTeacher(this.university)
      .subscribe(result => this.goToAllTeachers());
  }

}
