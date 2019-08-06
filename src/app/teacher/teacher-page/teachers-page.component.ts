import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from 'src/app/model/teacher.model';
import {TeacherService} from '../../service/teacher.service';
import {TeachersComponent} from '../teachers.component';
import {Feedback} from '../../model/feedback.model';
import {FeedbackService} from '../../service/feedback.service';
import {UserService} from '../../service/user.service';
import {AlertService} from '../../service/alert.service';
import {User} from '../../model/user.model';


@Component({
    selector: 'app-teachers-page',
    templateUrl: './teachers-page.component.html',
    styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit {
    teacher: Teacher;
    user: User;
    feedbacks: Feedback[];
    teacherId: number;

    constructor(private teacherService: TeacherService, private feedbackService: FeedbackService,
                private userService: UserService, private alertService: AlertService,
                private tlist: TeachersComponent, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params.id);
            this.teacherId = params.id;
        });
        this.getTeacher(this.teacherId);
        this.feedbackService.getAllFeedbacksByTeacherId(this.teacherId).subscribe(res => {
            console.log(this.teacherId);
            this.feedbacks = res;
        });
        this.getUser();
    }

    getUser() {
        this.userService.getCurrentUser().subscribe(
            user => {
                this.user = user;
            }, () => {
                this.user = null;
            }
        );
    }

    getTeacher(teacherId: number) {
        // this.teacherId = +this.route.snapshot.params.id;
        // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
        console.log(this.teacherId);
        this.teacherService.showTeacherPage(this.teacherId)
            .subscribe(teacher => {
                console.log(this.teacherId);
                this.teacher = teacher;
            });
    }

    canChangeOrDeleteTeacher(user) {

        if (!this.user) {
            return false;
        }
        for (let privilege of this.user.privileges) {
            if (privilege.name.toUpperCase() === 'TEACHER_DELETE_ANY_PRIVILEGE') {
                return true;
            }
        }
        return false;
    }

    deleteTeacher(teacherId: number) {
        if (confirm('Are You sure You want to delete this teacher?')) {
            console.log('delete');
            this.teacherService.deleteTeacher(teacherId)
                .subscribe(result => {
                    console.log('delete');
                    this.router.navigate(['/teachers']);
                    },
                    error => {
                        this.alertService.error(error);
                        alert(error);
                    });
        }
    }
}
