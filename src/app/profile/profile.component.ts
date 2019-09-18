import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { QuestionForListDTO } from '../model/questionForListDTO.model';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../service/feedback.service';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../service/answer.service';
import { ChatService } from '../service/chat.service';
import { CustomerService } from '../service/customer.service';
import { CustomerDTO } from '../model/customerDTO.model';
import { FreelanceService } from '../service/freelance.service';
import { OrderService } from '../service/order.service';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  currentUser: User;
  questions: QuestionForListDTO[];
  feedbacks: Feedback[];
  publicTeams: Team[];
  privateTeams: Team[];
  answersCount: number;
  ordersDoneCount: number;
  rating: number;
  customer: CustomerDTO;

  clarity: number;
  contact: number;
  formulation: number;
  payment: number;

  quality: number;
  price: number;
  velocity: number;
  contactFreelance: number;

  constructor(
    private userService: UserService,
    private feedbackService: FeedbackService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private customerService: CustomerService,
    private freelancerService: FreelanceService,
    private orderService: OrderService,
    private teamService: TeamService,
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
    this.teamService.getAllPublicTeamByUserUsername(user.username).subscribe(res => {
      this.publicTeams = res;
    });
    this.teamService.getAllPrivateTeamByUserUsername(user.username).subscribe(res => {
      this.privateTeams = res;
    });
  }

  getUserStatistics(user: User) {
    this.answerService.getCountOfAnswersByUsername(user.username).subscribe(res => {
      this.answersCount = res;
      this.rating = res * 5;
    });

    this.orderService.getCountDoneByUserUsername(user.username).subscribe(res => {
      this.ordersDoneCount = res;
      this.rating += res * 10;
    });

    this.answerService.getCountOfApprovedAnswersByUsername(user.username).subscribe(res => {
      this.rating = this.rating + res * 5;
    });

    this.answerService.getSumOfRatingByUserUsername(user.username).subscribe(res => {
      this.rating += res;
    });

    this.customerService.getRatingByUserUsername(user.username).subscribe(res => {
      this.clarity = res.clarity / 5 * 100;
      this.contact = res.contact / 5 * 100;
      this.formulation = res.formulation / 5 * 100;
      this.payment = res.payment / 5 * 100;
    })

    this.freelancerService.getRatingByUserUsername(user.username).subscribe(res => {
      this.quality = res.quality / 5 * 100;
      this.price = res.price / 5 * 100;
      this.velocity = res.velocity / 5 * 100;
      this.contactFreelance = res.contact / 5 * 100;
    })
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
        this.router.navigateByUrl('chat/' + res + '/' + true) ;
      });
  }
}
