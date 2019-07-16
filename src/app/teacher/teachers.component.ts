import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {TeacherService} from '../service/teacher.service';
import {Teacher} from '../model/teacher.model';
import {TeacherForListDTO} from '../model/teacherForListDTO.model';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],

})
export class TeachersComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  myControl = new FormControl();
  filteredTeachers: Observable<string[]>;
  keywordSearch = false;
  keywords: Teacher[] = [];

  teachers: TeacherForListDTO[];
  teachersTotalCount: number;
  pageSize: number = 5;
  page: number = 1;

  constructor(private router: Router, private service: TeacherService, private activRouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.service.findAllTeacher().subscribe(data => this.teachers = data);
    // this.getAllTeachers();

  }
  getAllTeachers() {
    this.service.getAllTeachers(this.getCurrentPaginationSettings())
        .subscribe(teacherPaginatedDTO => {
          this.teachers = teacherPaginatedDTO.teachers;
          this.teachersTotalCount = teacherPaginatedDTO.teachersTotalCount;
        });
  }

  searchByLastName() {
    if (this.keywords.length === 0) {
      alert('Please enter the last name');
      return;
    }

    this.keywordSearch = true;
    this.getTeachersByLastName();

    this.page = 1;
  }

  getTeachersByLastName() {
    this.service.searchTeachersByLastName(this.createSearchPattern(), this.getCurrentPaginationSettings())
        .subscribe(teacherPaginatedDTO => {
          this.teachers = teacherPaginatedDTO.teachers;
          this.teachersTotalCount = teacherPaginatedDTO.teachersTotalCount;
        });
  }

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add keyword
    if ((value || '').trim()) {
      this.keywords.push({id: 0, lastName: value.trim(), university: null, mark: null,
        firstName: null, imageUrl: null});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: Teacher): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  createSearchPattern(): string {
    let searchPattern: string = '';
    this.keywords.forEach(keyword => {
      searchPattern += keyword.lastName;
    });
    if (searchPattern === '') {
      return searchPattern;
    } else {
      return searchPattern.substring(0, searchPattern.length);
    }
  }

  getCurrentPaginationSettings(): string {
    return '?page=' + (this.page - 1) + '&size=' + this.pageSize;
  }

  getTeacherById(teacherId: number){
    // this.router.navigate(['/{teacherId}']);
    console.log(teacherId);
    this.router.navigate(['/teachers', teacherId]);
  }


}
