import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from 'src/app/model/teacher.model';
import {TeacherService} from '../../service/teacher.service';
import {TeachersComponent} from '../teachers.component';
import {Feedback} from '../../model/feedback.model';
import {FeedbackService} from '../../service/feedback.service';
import {UserService} from '../../service/user.service';


@Component({
    selector: 'app-teachers-page',
    templateUrl: './teachers-page.component.html',
    styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit {
    teacher: Teacher;
    feedbacks: Feedback[];
    // public feedbacks = [];
    teacherId: number;

    constructor(private teacherService: TeacherService, private feedbackService: FeedbackService,
                private userService: UserService,
                private tlist: TeachersComponent, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.getTeacher();
        this.feedbackService.getAllFeedbacksByTeacherId(this.teacherId).subscribe(res => {
            console.log(this.teacherId);
            this.feedbacks = res;
        });
    }

    getTeacher() {
        this.teacherId = +this.route.snapshot.params.id;
        // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
        console.log(this.teacherId);
        this.teacherService.showTeacherPage(this.teacherId)
            .subscribe(teacher => {
                console.log(this.teacherId);
                this.teacher = teacher;
            });
    }
}
