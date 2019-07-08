import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { QuestionForListDTO } from '../model/questionForListDTO.model';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../service/feedback.service';
import { QuestionService } from '../service/question.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: String;
  user: User;
  questions: QuestionForListDTO[];
  feedbacks: Feedback[];

  constructor(private userService: UserService, private feedbackService: FeedbackService,
    private questionService: QuestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params.username;
    });
    if (this.username === undefined) {
      this.userService.getCurrentUser().subscribe(res => {
        this.user = res;

        this.questionService.getAllQuestionsByUser(res.username).subscribe(res => {
          this.questions = res;
        });
        this.feedbackService.getAllFeedbacksByUser(res.username).subscribe(res => {
          this.feedbacks = res;
        });
      });
    } else {
      this.userService.getForeignUser(this.username).subscribe(res => {
        this.user = res;

        this.questionService.getAllQuestionsByUser(res.username).subscribe(res => {
          this.questions = res;
        });
        this.feedbackService.getAllFeedbacksByUser(res.username).subscribe(res => {
          this.feedbacks = res;
        });
      });
    }
  }
}



