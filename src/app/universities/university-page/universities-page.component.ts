import {Component, Input, OnInit} from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {UniversitiesComponent} from '../universities.component';
import {FeedbackService} from '../../service/feedback.service';
import {Feedback} from '../../model/feedback.model';


@Component({
    selector: 'app-universities-page',
    templateUrl: './universities-page.component.html',
    styleUrls: ['./universities-page.component.scss']
  })
export class UniversitiesPageComponent implements OnInit{
   university: University;
    feedbacks: Feedback[];
    universityId: number;

  constructor(private universityService: UniversityService, private tlist: UniversitiesComponent,
              private feedbackService: FeedbackService, private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {
      this.getUniversity();
      this.feedbackService.getAllFeedbacksByUniversityId(this.universityId).subscribe(res => {
          console.log(this.universityId);
          this.feedbacks = res;
      });
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

    // //Checking if User is question creator. If no - he can not see "edit" & "delete" buttons.
    // canChangeOrDeleteUniversity(university) {
    //
    //     if (!this.user) { return false; }
    //     let allowDelete = this.user.username === university.user.username;
    //     if (allowDelete) {
    //         return allowDelete;
    //     } else {
    //         for (let privilege of this.user.privileges) {
    //             if (privilege.name.toUpperCase() === "QUESTION_DELETE_ANY_PRIVILEGE") {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     }
    // }
    //
    // //deletes question. If success - refresh the page. If not - shows error message and redirect to all questions page.
    // deleteQuestion(questionId: number) {
    //     if (confirm("Are You sure You want to delete this question?")) {
    //         this.questionService.deleteQuestion(questionId)
    //             .subscribe((data) => {
    //                     if (data === "Question deleted") {
    //                         alert(data);
    //                         this.router.navigate(["/questions"]);
    //                         console.log(data);
    //
    //                     } else {
    //                         alert(data);
    //                         this.getQuestion();
    //                         console.log(data);
    //                     }
    //                 },
    //                 error => {
    //                     this.alertService.error(error);
    //                     alert(error);
    //                 });
    //     }
    // }
}
