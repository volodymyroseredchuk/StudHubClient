import { Component, Input } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionsComponent } from '../questions.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';



@Component({
    selector: 'app-questions-page',
    templateUrl: './questions-page.component.html',
    styleUrls: ['./questions-page.component.scss']
  })
export class QuestionsPageComponent{
  
  
   question: Question;

  constructor(private questionService: QuestionService, private qlist: QuestionsComponent, private route: ActivatedRoute,
    private router: Router){
    
  }

  ngOnInit() {
      this.getQuestion();
  }

  getQuestion() {
    //const id = +this.route.snapshot.paramMap.get('id');
    //const id = +this.route.snapshot.params.id;
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.questionService.showQuestionPage(id)
      .subscribe(question => this.question = this.question);
  }

  

}