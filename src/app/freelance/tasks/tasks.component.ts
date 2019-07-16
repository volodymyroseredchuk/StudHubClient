import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/model/tag.model';
import { QuestionService } from 'src/app/service/question.service';
import { MatChipInputEvent } from '@angular/material';
import { TaskPaginatedDTO } from 'src/app/model/taskPaginatedDTO.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  tasksTotalCount: number;
  pageSize: number = 10;
  page: number = 1;
  today: Date = new Date();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  searchBy = 1;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tagSearch = false;
  keywordSearch = false;
  keywords: Tag[] = [];
  myControl = new FormControl();
  constructor(private router: Router, 
    private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks(this.getCurrentPaginationSettings())
      .subscribe(tasksPaginated => {
        console.log(tasksPaginated);
        this.tasks = tasksPaginated.tasks;
        this.tasksTotalCount = tasksPaginated.tasksTotalCount;
      });
  }

  getTaggedTasks() {
    this.taskService.searchTasksByTags(this.createSearchPattern(), this.getCurrentPaginationSettings())
      .subscribe(taskPaginatedDTO => {
        this.tasks = taskPaginatedDTO.tasks;
        this.tasksTotalCount = taskPaginatedDTO.tasksTotalCount;
      });

  }

  onItemChange(value){
    this.searchBy = value;
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

  search(){
    if(this.searchBy == 1){
      this.searchByTags();
    } else {
      this.searchByKeywords();
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
      this.getAllTasks();
      return;
    }

    this.tagSearch = true;
    this.getTaggedTasks();

    this.page = 1;
  }

  searchByKeywords() {
    if (this.keywords.length == 0) {
      this.getAllTasks();
      return;
    }
    
    this.keywordSearch = true;
    this.getSearchedTasks();

    this.page = 1;
  }

  getSearchedTasks() {
    this.taskService.searchTasksByKeywords(this.createSearchPattern(), this.getCurrentPaginationSettings())
      .subscribe(taskPaginatedDTO => {
        this.tasks = taskPaginatedDTO.tasks;
        this.tasksTotalCount = taskPaginatedDTO.tasksTotalCount;
      });
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
    this.pageSize = 10;
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    if (this.tagSearch) {
      this.getTaggedTasks();
    } else if (this.keywordSearch) {
      this.getSearchedTasks();
    } else {
      this.getAllTasks();
    }
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }
}
