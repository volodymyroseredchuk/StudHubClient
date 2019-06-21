import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { Observable } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Question } from '../model/question.model';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Tag } from '../model/tag.model';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',  
  styleUrls: ['./questions.component.scss'],
  
})
export class QuestionsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  keywords: Tag[] = [];

  myControl = new FormControl();
  public questions = [];
  filteredQuestions: Observable<string[]>;
 
  constructor(private router: Router, private service: QuestionService, private activRouter: ActivatedRoute) { }

  ngOnInit() {
    
    this.service.getAllQuestions().subscribe(data => {
      console.log('Список питань :', data);
      this.questions = data
  });
    
  }

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add keyword
    if ((value || '').trim()) {
      this.keywords.push({id:0, name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: Tag): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  searchByTags() {
    if (this.keywords.length == 0) {
      alert("Please enter some tags");
      return;
    }

    this.service.searchQuestionsByTags(this.createSearchPattern())
      .subscribe(data => this.questions = data);
  }

  searchByKeywords() {
    if (this.keywords.length == 0) {
      alert("Please enter some keywords");
      return;
    }
    
    this.service.searchQuestionsByKeywords(this.createSearchPattern())
      .subscribe(data => this.questions = data);
  }

  createSearchPattern(): string {
    let searchPattern: string = "";
    this.keywords.forEach(keyword => {
      searchPattern += keyword.name;
      searchPattern += " ";
    });
    return searchPattern.trim();
  }

  refresh() {
    this.keywords = [];
    this.ngOnInit();
  }

}
