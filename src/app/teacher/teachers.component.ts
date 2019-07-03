import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Question} from '../model/question.model';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {TeacherService} from '../service/teacher.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],

})
export class TeachersComponent implements OnInit {
  myControl = new FormControl();
  public teachers = [];
  filteredTeachers: Observable<string[]>;


  constructor(private router: Router, private service: TeacherService, private activRouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.service.findAllTeacher().subscribe(data => this.teachers = data);

  }






}
