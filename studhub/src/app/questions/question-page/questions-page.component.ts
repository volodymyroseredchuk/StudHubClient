import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { AnswerCreateDTO } from 'src/app/model/answerCreateDTO.model'
import { QuestionService } from 'src/app/service/question.service';
import { QuestionsComponent } from '../questions.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AnswerService } from 'src/app/service/answer.service';
import { switchMap } from 'rxjs/operators';
import { VoteService } from 'src/app/service/vote.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';





@Component({
    selector: 'app-questions-page',
    templateUrl: './questions-page.component.html',
    styleUrls: ['./questions-page.component.scss']
  })
export class QuestionsPageComponent implements OnInit{  
  

   question: Question;   
   public questionList: Question[];
   user: User;
   
  constructor(private questionService: QuestionService,
               private qlist: QuestionsComponent, private route: ActivatedRoute,
              private router: Router, private location: Location, private answerService: AnswerService,
              private voteService : VoteService, private userService: UserService){

    
  }

  ngOnInit(): void {    
    //this.questionService.questions.subscribe(data=>{this.questionList=data;});
    this.getQuestion();
     
  }


  getQuestion() {   
    const id = +this.route.snapshot.params.id;    
    this.questionService.showQuestionPage(id)
      .subscribe(question => {
        this.question = question;
        this.getUser();
      });      
  }

  getUser() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        this.getUserVotes();
      }, err  => {
        this.user = null;
      }
    )
  }

  getUserVotes() {
    this.voteService.getAnswerVotesForQuestion(this.question.id).subscribe(
      votes => {
        for(let vote of votes){
          let answer = this.question.answerList.find((answer) => {
            return vote.answerId == answer.id;
          });
          if(answer.vote){
            if (answer.vote.value !== vote.value){
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
    )
  }

  goToAllQuestions() {
  this.questionService.getAllQuestions().subscribe(data=>this.questionList = data);   
    alert("Question deleted. Press 'back' to see list of questions");
    this.router.navigate(['/questions']);
  }

  delete (questionId:number){    
      this.questionService.deleteQuestion(questionId).subscribe(()=>this.goToAllQuestions());
      alert("all is bad");
      //.subscribe(()=> this.goToAllQuestions());
      //this.questionList = this.questionList.filter(item => item.id != questionId);
      console.log("Delete ",questionId);      
  }

  goBack(): void {
    this.location.back();
  }  


  recieveNewAnswer($event){
    this.question.answerList.push($event);
  }
  
  deleteAnswer(answerId:number){

    this.answerService.deleteAnswer(this.question.id, answerId)
      .subscribe(serverResponce => {
        this.deleteAnswerFromList(serverResponce, answerId)
      });
  }

  deleteAnswerFromList(serverResponce: String, answerId:number ){
    if (serverResponce === "Answer deleted"){
      this.question.answerList = this.question.answerList.filter(function (value, index, arr){
        return value.id !== answerId;
      })
    }
  }



  approveAnswer(answerId: number, newApproved: boolean){

    this.answerService.approveAnswer(this.question.id, answerId, newApproved)
      .subscribe(response => {
        this.question.answerList.find((answer) => {
          return response.answerId == answer.id;
        }).approved = response.approved;
      })
  }

  upvoteAnswer(answerId:number){
    this.voteService.upvoteAnswer(answerId)
      .subscribe( vote => {
        let answer = this.question.answerList.find((answer) => {
          return vote.answerId == answer.id;
        });
        if(answer.vote){
          if (answer.vote.value !== vote.value){
            answer.rate -= answer.vote.value;
            answer.rate += vote.value;
            answer.vote = vote;
          }
        } else {
          answer.rate += vote.value;
          answer.vote = vote;
        }
        
      })
  }

  downvoteAnswer(answerId:number){
    this.voteService.downvoteAnswer(answerId)
    .subscribe( vote => {
      let answer = this.question.answerList.find((answer) => {
        return vote.answerId == answer.id;
      });
      if(answer.vote){
        if (answer.vote.value !== vote.value){
          answer.rate -= answer.vote.value;
          answer.rate += vote.value;
          answer.vote = vote;
        }
      } else {
        answer.rate += vote.value;
        answer.vote = vote;
      }
      
    })
  }

}