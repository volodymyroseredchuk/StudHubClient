import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionsComponent } from '../questions.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-questions-page',
    templateUrl: './questions-page.component.html',
    styleUrls: ['./questions-page.component.scss']
  })
export class QuestionsPageComponent implements OnInit{  
  
   question: Question;   
   public questionList: Question[];
   
  constructor(private questionService: QuestionService,
               private qlist: QuestionsComponent, private route: ActivatedRoute,
              private router: Router, private location: Location){
    
  }

  ngOnInit(): void {    
    //this.questionService.questions.subscribe(data=>{this.questionList=data;});
    this.getQuestion();      
  }

  getQuestion() {   
    const id = +this.route.snapshot.params.id;    
    this.questionService.showQuestionPage(id)
      .subscribe(question => this.question = question);      
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

}