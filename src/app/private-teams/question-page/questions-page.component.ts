import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AnswerService } from 'src/app/service/answer.service';
import { VoteService } from 'src/app/service/vote.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { Answer } from 'src/app/model/answer.model';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/model/comment.model';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class TeamQuestionsPageComponent implements OnInit {

  question: Question;
  public questionList: Question[];
  user: User;
  answer: Answer = new Answer();
  comment: Comment = new Comment();
  loadCommentComponent: boolean = false;

  constructor(private questionService: QuestionService, private route: ActivatedRoute,
    private router: Router, private location: Location, private answerService: AnswerService,
    private voteService: VoteService, private userService: UserService, private commentService: CommentService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  //shows question page by id. If id is not valid - error is shown
  getQuestion() {
    const id = +this.route.snapshot.params.id;
    this.questionService.showQuestionPage(id)
      .subscribe(question => {
        this.question = question;
        this.getUser();
        console.log(this.question);
      },
        error => {
          alert(error);
          this.alertService.error(error);
          console.log(error);
          this.router.navigate(["/questions"]);

        });
  }

  //"back" button
  goBack(): void {
    this.location.back();
  }

  //Currently logged in user
  getUser() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        this.getUserVotes();
      }, () => {
        this.user = null;
      }
    )
  }

  //Checking if User is question creator. If no - he can not see "edit" & "delete" buttons.
  canChangeOrDeleteQuestion(question) {

    if (!this.user) { return false; }
    let allowDelete = this.user.username === question.user.username;
    if (allowDelete) {
      return allowDelete;
    } else {
      for (let role of this.user.roles) {
        if (role.name.toUpperCase() === "ROLE_MODERATOR" || role.name.toUpperCase() === "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }

  //deletes question. If success - refresh the page. If not - shows error message and redirect to all questions page. 
  deleteQuestion(questionId: number) {
    if (confirm("Are You sure You want to delete this question?")) {
      this.questionService.deleteQuestion(questionId)
        .subscribe((data) => {
          if (data === "Question deleted") {
            alert(data);
            this.router.navigate(["/questions"]);
            console.log(data);

          } else {
            alert(data);
            this.getQuestion();
            console.log(data);
          }
        },
          error => {
            this.alertService.error(error);
            alert(error);
          });
    }
  }

  //show comment editor on button click
  loadCreateComment() {
    if(!this.user){
      if(window.confirm("Only registered users can comment. Wanna log in?")){
        this.router.navigate(["/signin"]);
      }else{
        this.getQuestion();
      }
    }else{
      this.loadCommentComponent = true;
    }
  }

  //create new comment and adds it to answer's comment list. Shows error message if not successful
  recieveNewComment($event) {
    this.question.answerList.find((answer) => {
      return answer.id = $event.answer.id;
    }).comment.push($event);
    this.loadCommentComponent = false;
  }

  //Checking if User is comment creator. If no - he can not see "edit" & "delete" buttons.
  canChangeOrDeleteComment(comment) {

    if (!this.user) { return false; }
    let allowDelete = this.user.username === comment.user.username;
    if (allowDelete) {
      return allowDelete;
    } else {
      for (let role of this.user.roles) {
        if (role.name.toUpperCase() === "ROLE_MODERATOR" || role.name.toUpperCase() === "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }

  //deletes comment. Shows error message if not successful. Refresh the page
  deleteComment(answerId: number, commentId: number) {
    if (confirm("Are You sure to delete comment?")) {
      this.commentService.deleteComment(answerId, commentId)
        .subscribe((data) => {
          this.getQuestion();
          alert(data);
        },
          error => {
            this.alertService.error(error);
            alert(error);
          })
    }
  }

  recieveNewAnswer($event) {
    let pushed = false;
    for(var i = 0; i < this.question.answerList.length; i++) {
      if(this.question.answerList[i].rate < 0) {
        pushed = true;
        this.question.answerList.splice(i,0,$event);
        break;
      }
    }
    if(!pushed){
      this.question.answerList.push($event);
    }
  }

  //Checking if User is answer creator. If no - he can not see "edit" & "delete" buttons.
  canDelete(answer) {
    //console.log(this.user)
    if (!this.user) { return false; }
    let allowDelete = this.user.username === answer.user.username;
    if (allowDelete) {
      if (answer.approved) { return false; }
      return allowDelete;
    } else {
      for (let role of this.user.roles) {
        if (role.name.toUpperCase() === "ROLE_MODERATOR" || role.name.toUpperCase() === "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }

  deleteAnswer(answerId: number) {
    if (confirm("Are You sure You want to delete this answer?")){
    this.answerService.deleteAnswer(this.question.id, answerId)
      .subscribe(serverResponce => {
        this.deleteAnswerFromList(serverResponce, answerId)
      });
    }
  }

  deleteAnswerFromList(serverResponce, answerId: number) {
    if (serverResponce.isDeleted) {
      this.question.answerList = this.question.answerList.filter(function (value, index, arr) {

        return value.id !== answerId;
      })
    }
  }



  approveAnswer(answerId: number, newApproved: boolean) {

    this.answerService.approveAnswer(this.question.id, answerId, newApproved)
      .subscribe(response => {
        this.question.answerList.find((answer) => {
          return response.answerId == answer.id;
        }).approved = response.approved;
      })
  }


  getUserVotes() {
    this.voteService.getAnswerVotesForQuestion(this.question.id).subscribe(
      votes => {
        for (let vote of votes) {
          let answer = this.question.answerList.find((answer) => {
            return vote.answerId == answer.id;
          });

          answer.vote = vote;
        }
      }
    )
  }

  upvoteAnswer(answer) {
    if(!this.user){ return; }
    if(answer.vote && answer.vote.value > 0) {
      this.voteService.resetVoteAnswer(answer.id)
        .subscribe(vote => this.registerVote(vote));
    } else {
      this.voteService.upvoteAnswer(answer.id)
        .subscribe(vote => this.registerVote(vote));
    }
  }


  downvoteAnswer(answer) {
    if(!this.user){ return; }
    if(answer.vote && answer.vote.value < 0) {
      this.voteService.resetVoteAnswer(answer.id)
        .subscribe(vote => this.registerVote(vote));
    } else {
      this.voteService.downvoteAnswer(answer.id)
        .subscribe(vote => this.registerVote(vote));
    }
  }

  registerVote(vote) {
    {
      let answer = this.question.answerList.find((answer) => {
        return vote.answerId == answer.id;
      });
      if (answer.vote) {
        if (answer.vote.value !== vote.value) {
          answer.rate -= answer.vote.value;
          answer.rate += vote.value;
          answer.vote = vote;
        }
      } else {
        answer.rate += vote.value;
        answer.vote = vote;
      }

    }
  }

}