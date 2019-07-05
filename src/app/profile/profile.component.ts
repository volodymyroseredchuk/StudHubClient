import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {QuestionForListDTO} from '../model/questionForListDTO.model';
import {Feedback} from '../model/feedback.model';
import {FeedbackService} from '../service/feedback.service';
import {QuestionService} from '../service/question.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  questions: QuestionForListDTO[];
  feedbacks: Feedback[];

  constructor(private userService: UserService, private feedbackService: FeedbackService,
              private questionService: QuestionService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
    this.questionService.getAllQuestionsByCurrentUser().subscribe(res => {
      this.questions = res;
    });
    this.feedbackService.getAllFeedbacksByCurrentUser().subscribe(res => {
      this.feedbacks = res;
    });
  }

}



