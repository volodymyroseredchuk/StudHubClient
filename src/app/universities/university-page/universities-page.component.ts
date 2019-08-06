import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {UniversitiesComponent} from '../universities.component';
import {FeedbackService} from '../../service/feedback.service';
import {Feedback} from '../../model/feedback.model';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {AlertService} from '../../service/alert.service';


@Component({
    selector: 'app-universities-page',
    templateUrl: './universities-page.component.html',
    styleUrls: ['./universities-page.component.scss']
})
export class UniversitiesPageComponent implements OnInit {
    university: University;
    feedbacks: Feedback[];
    universityId: number;
    user: User;

    constructor(private universityService: UniversityService, private tlist: UniversitiesComponent,
                private feedbackService: FeedbackService, private alertService: AlertService,
                private route: ActivatedRoute, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.getUniversity();
        this.feedbackService.getAllFeedbacksByUniversityId(this.universityId).subscribe(res => {
            console.log(this.universityId);
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

    getUniversity() {

        this.universityId = +this.route.snapshot.params.id;
        // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
        console.log(this.universityId);
        this.universityService.showUniversityPage(this.universityId)
            .subscribe(university => {
                console.log(this.universityId);
                this.university = university;
            });
    }


    canChangeOrDeleteUniversity(user) {

        if (!this.user) {
            return false;
        }
        for (let privilege of this.user.privileges) {
            if (privilege.name.toUpperCase() === 'UNIVERSITY_DELETE_ANY_PRIVILEGE') {
                return true;
            }
        }
        return false;
    }

    deleteUniversity(universityId: number) {
        if (confirm('Are You sure You want to delete this university?')) {
            console.log('delete');
            this.universityService.deleteUniversity(universityId)
                .subscribe(result => {
                        console.log('delete');
                        this.router.navigate(['/universities']);
                    }
                    // ,
                    // error => {
                    //     this.alertService.error(error);
                    //     alert(error);
                    // }
                );
        }
    }
}
