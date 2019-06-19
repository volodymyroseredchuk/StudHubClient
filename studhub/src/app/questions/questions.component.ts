import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];
  
  constructor(private router: Router, private questionService: QuestionService) { }

  ngOnInit() {
    this.searchQuestion();
  }

  searchQuestion() {
    this.questionService.searchQuestions("templateTitle")
      .subscribe(questions => this.questions = questions);
  }
}
