import { Component, Input } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { AnswerCreateDTO } from 'src/app/model/answerCreateDTO.model'
import { QuestionService } from 'src/app/service/question.service';
import { QuestionsComponent } from '../questions.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AnswerService } from 'src/app/service/answer.service';



@Component({
    selector: 'app-questions-page',
    templateUrl: './questions-page.component.html',
    styleUrls: ['./questions-page.component.scss']
  })
export class QuestionsPageComponent{
  
  
   question: Question;

  constructor(private questionService: QuestionService, private qlist: QuestionsComponent, private route: ActivatedRoute,
    private router: Router, private answerService: AnswerService){
    
  }

  ngOnInit() {
      this.getQuestion();
  }

  getQuestion() {
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = +this.route.snapshot.params.id;
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.questionService.showQuestionPage(id)
      .subscribe(question => this.question = question);
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

}