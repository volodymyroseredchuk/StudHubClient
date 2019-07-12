import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { QuestionForListDTO } from '../model/questionForListDTO.model';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../service/feedback.service';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../service/answer.service';
import { VoteService } from '../service/vote.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  questions: QuestionForListDTO[];
  feedbacks: Feedback[];
  currentUser: User;
  answersCount: number;
  approvedAnswersCount: number;
  rating: number;

  constructor(private userService: UserService, private feedbackService: FeedbackService,
    private questionService: QuestionService , private answerService: AnswerService,
    private voteService: VoteService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    var username: String;
    this.route.params.subscribe(params => {
      username = params.username;
    });
    if (username === undefined) {
      this.userService.getCurrentUser().subscribe(res => {
        this.user = res;

        this.getUserFeedbacksAndQuestions(res);
        this.getUserStatistics(res);
      });
    } else {
      this.userService.getForeignUser(username).subscribe(res => {
        this.user = res;

        this.getUserFeedbacksAndQuestions(res);
        this.getUserStatistics(res);
      });
    }
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });
    
  }

  getUserFeedbacksAndQuestions(user:User){
    this.questionService.getAllQuestionsByUser(user.username).subscribe(res => {
      this.questions = res;
    });
    this.feedbackService.getAllFeedbacksByUser(user.username).subscribe(res => {
      this.feedbacks = res;
    });
  }

  getUserStatistics(user: User){
    this.answerService.getCountOfAnswersByUsername(user.username).subscribe(res => {
      this.answersCount = res;
      this.rating = res * 5;
    });
  
    this.answerService.getCountOfApprovedAnswersByUsername(user.username).subscribe(res => {
      this.approvedAnswersCount = res;
      this.rating += res * 5;
    });

    this.voteService.getSumOfVotesByUsername(user.username).subscribe(res => {
      this.rating += res;
    });
  }
}



