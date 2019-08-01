import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { QuestionForListDTO } from '../model/questionForListDTO.model';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../service/feedback.service';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../service/answer.service';
import { VoteService } from '../service/vote.service';
import { ChatService } from '../service/chat.service';


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

  constructor(
    private userService: UserService,
    private feedbackService: FeedbackService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ) { }

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
    if (localStorage.getItem('accessToken')) {
      this.userService.getCurrentUser().subscribe(res => {
        this.currentUser = res;
      });
    }
  }

  getUserFeedbacksAndQuestions(user: User) {
    this.questionService.getAllQuestionsByUser(user.username).subscribe(res => {
      this.questions = res;
    });
    this.feedbackService.getAllFeedbacksByUser(user.username).subscribe(res => {
      this.feedbacks = res;
    });
  }

  getUserStatistics(user: User) {
    this.answerService.getCountOfAnswersByUsername(user.username).subscribe(res => {
      this.answersCount = res;
      this.rating = res * 5;
    });

    this.answerService.getCountOfApprovedAnswersByUsername(user.username).subscribe(res => {
      this.approvedAnswersCount = res;
      this.rating = this.rating + res * 5;
    });

    this.voteService.getSumOfVotesByUsername(user.username).subscribe(res => {
      this.rating += res;
    });
  }

  sendMessage() {
    this.chatService.createChat(this.currentUser.id, this.user.id, false).subscribe(
      res => {
        this.router.navigateByUrl('chat/' + res + '/' + false);
      });
  }
  sendSecretMessage() {
    this.chatService.createChat(this.currentUser.id, this.user.id, true).subscribe(
      res => {
        this.router.navigateByUrl('chat/' + res + '/' + true);
      });
  }
}
