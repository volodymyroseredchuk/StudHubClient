import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Tag } from 'src/app/model/tag.model';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.scss']
})
export class TasksCreateComponent implements OnInit {

  task: Task = new Task();
  taskCreateForm: FormGroup;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  constructor(private taskService: TaskService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taskCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      expectedPrice: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.taskCreateForm.controls; }

  goToAllTasks() {
    this.router.navigate(['/tasks']);    
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskCreateForm.invalid) {
          return;
    }

    console.log(this.task.deadlineDate);
    
    if (new Date(this.task.deadlineDate).getTime() <= new Date().getTime()) {
      alert("Deadline date should be bigger than current");
      return;
    }

    this.task.tagList = this.tags;
    console.log(this.task);
    this.taskService.createTask(this.task)
      .subscribe(result => {
        alert("Task was successfully created");
        this.goToAllTasks();
      })  
  }

  goBack(): void {
    this.location.back();
  }
}
