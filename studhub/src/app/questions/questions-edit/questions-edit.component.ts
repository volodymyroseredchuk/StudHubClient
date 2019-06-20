import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { Tag } from 'src/app/model/tag.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.scss']
})
export class QuestionsEditComponent implements OnInit{

    question: Question;
    newQuestion: Question;
    tags: Tag[]= [];
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(private questionService: QuestionService, private router: Router, private route: ActivatedRoute) {
        this.newQuestion = new Question();
        this.question = new Question();
       }

    ngOnInit(): void {
        this.getQuestion();        
    }
  
    getQuestion() {   
      const id = +this.route.snapshot.params.id;    
      this.questionService.showQuestionPage(id)
        .subscribe(question => this.question = question);      
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

    onSubmit(){
        this.newQuestion.tagList = this.tags;
        this.questionService.editQuestion(this.question.id, this.newQuestion)
        .subscribe(result => this.goToAllQuestions());
    }

    goToAllQuestions() {
        this.router.navigate(['/questions']);    
      }
  


}