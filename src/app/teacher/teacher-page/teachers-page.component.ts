import {Component} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from 'src/app/model/teacher.model';
import {TeacherService} from '../../service/teacher.service';
import {TeachersComponent} from '../teachers.component';


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

    let teacherId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.teacherService.showTeacherPage(teacherId)
      .subscribe(teacher => this.teacher = this.teacher);
  }
}
