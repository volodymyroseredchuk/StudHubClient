import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',  
  styleUrls: ['./questions.component.scss'],
  
})
export class QuestionsComponent implements OnInit {
  myControl = new FormControl();
  public questions = [];
  filteredQuestions: Observable<string[]>;
 
  constructor(private router: Router, private service: QuestionService, private activRouter: ActivatedRoute) { }

  ngOnInit() {
    
    this.service.getAllQuestions().subscribe(data => this.questions = data);
    
  }


}
