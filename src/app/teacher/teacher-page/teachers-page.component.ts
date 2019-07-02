import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {TeachersComponent} from "../teachers.component";
import {TeacherService} from "../../service/teacher.service";
import {Teacher} from "../../model/teacher.model";



@Component({
    selector: 'app-teachers-page',
    templateUrl: './teachers-page.component.html',
    styleUrls: ['./teachers-page.component.scss']
  })
export class TeachersPageComponent{
  
  
   teacher: Teacher;

  constructor(private teacherService: TeacherService, private tlist: TeachersComponent, private route: ActivatedRoute,
    private router: Router){
    
  }

  ngOnInit() {
      this.getTeacher();
  }

  getTeacher() {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.teacherService.showTeacherPage(id)
      .subscribe(question => this.teacher = this.teacher);
  }

  

}
