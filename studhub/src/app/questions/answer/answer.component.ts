import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerCreateDTO } from 'src/app/model/answerCreateDTO.model';
import { AnswerService } from 'src/app/service/answer.service';
import { Router } from '@angular/router';
import { Answer } from './../../model/answer.model'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  newAnswer: AnswerCreateDTO;
  answerService: AnswerService;
  router: Router;
  submitButtonEnabled: boolean;

  @Input() questionId: number;
  @Output() newAnswerEvent = new EventEmitter<Answer>();

  constructor(answerService: AnswerService, router: Router) {
    this.newAnswer = new Answer();
    this.answerService = answerService;
    this.router = router;
    this.submitButtonEnabled = true;
   }

  ngOnInit() {
  }



  onSubmit(){
    this.submitButtonEnabled = false;
    this.answerService.createAnswer(this.newAnswer, this.questionId)
      .subscribe(result =>{ 
        this.newAnswerEvent.emit(result);
        this.submitButtonEnabled = true;
        this.newAnswer.body = "";
        
      }, err =>{
        this.submitButtonEnabled = true;
        throw err;
      });
  }
}
