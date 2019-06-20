import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionsComponent } from '../questions.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-questions-page',
    templateUrl: './questions-page.component.html',
    styleUrls: ['./questions-page.component.scss']
  })
export class QuestionsPageComponent implements OnInit{  
  
   question: Question;   
   list: Question[]   
   
  constructor(private questionService: QuestionService,
               private qlist: QuestionsComponent, private route: ActivatedRoute,
              private router: Router, private location: Location){
    
  }

  ngOnInit(): void {
      this.getQuestion();      
  }

  getQuestion() {   
    const id = +this.route.snapshot.params.id;    
    this.questionService.showQuestionPage(id)
      .subscribe(question => this.question = question);      
  }

  goToAllQuestions() {
    this.questionService.getAllQuestions().subscribe(data=>this.list = data);
    this.router.navigate(['/questions']);
  }

  delete (id:number){
      this.questionService.deleteQuestion(id).subscribe(()=>this.goToAllQuestions())      
  }

  goBack(): void {
    this.location.back();
  }  

}