import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { QuestionService } from 'src/app/service/question.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Question } from 'src/app/model/question.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.scss']
})
export class QuestionsCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];
  question: Question;

  constructor(private questionService: QuestionService, private router: Router) {
    this.question = new Question();
   }

  ngOnInit() {
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push({id:0, name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  goToAllQuestions() {
    this.router.navigate(['/questions']);    
  }

  onSubmit(){
    this.question.tagList = this.tags;
    this.questionService.createQuestion(this.question)
      .subscribe(result => this.goToAllQuestions());
  }
}
