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
import { QuestionForListDTO } from '../model/questionForListDTO.model';



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

  tagSearch = false;
  keywordSearch = false;
  keywords: Tag[] = [];
  myControl = new FormControl();

  questions: QuestionForListDTO[] = [];
  questionsTotalCount: number;
  pageSize: number = 5;
  page: number = 1;

 
  constructor(private router: Router, private service: QuestionService, private activRouter: ActivatedRoute) { }

  ngOnInit() {

    this.getAllQuestions();
  }

  getAllQuestions() {
    this.service.getAllQuestions(this.getCurrentPaginationSettings())
      .subscribe(questionPaginatedDTO => {
        this.questions = questionPaginatedDTO.questions;
        this.questionsTotalCount = questionPaginatedDTO.questionsTotalCount;
      });
  }

  getSearchedQuestions() {
    this.service.searchQuestionsByKeywords(this.createSearchPattern(), this.getCurrentPaginationSettings())
      .subscribe(questionPaginatedDTO => {
        this.questions = questionPaginatedDTO.questions;
        this.questionsTotalCount = questionPaginatedDTO.questionsTotalCount;
      });
  }

  getTaggedQuestions() {
    this.service.searchQuestionsByTags(this.createSearchPattern(), this.getCurrentPaginationSettings())
      .subscribe(questionPaginatedDTO => {
        this.questions = questionPaginatedDTO.questions;
        this.questionsTotalCount = questionPaginatedDTO.questionsTotalCount;
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

    this.tagSearch = true;
    this.getTaggedQuestions();

    this.page = 1;
  }

  searchByKeywords() {
    if (this.keywords.length == 0) {
      alert("Please enter some keywords");
      return;
    }
    
    this.keywordSearch = true;
    this.getSearchedQuestions();

    this.page = 1;
  }

  createSearchPattern(): string {
    let searchPattern: string = "";
    this.keywords.forEach(keyword => {
      searchPattern += keyword.name;
      searchPattern += ",";
    });
    if (searchPattern == "") {
      return searchPattern;
    } else {
      return searchPattern.substring(0, searchPattern.length - 1);
    }
  }

  refresh() {
    this.keywords = [];
    this.tagSearch = false;
    this.keywordSearch = false;
    this.ngOnInit();
    this.page = 1;
    this.pageSize = 5;
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    if (this.tagSearch) {
      this.getTaggedQuestions();
    } else if (this.keywordSearch) {
      this.getSearchedQuestions();
    } else {
      this.getAllQuestions();
    }
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }

}
