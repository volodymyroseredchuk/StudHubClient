import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.scss']
})
export class TasksCreateComponent implements OnInit {

  task: Task = new Task();

  taskCreateForm: FormGroup;
  submitted = false;

  constructor(private taskService: TaskService,
    private router: Router,
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

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskCreateForm.invalid) {
          return;
    }

    if (new Date(this.task.deadlineDate).getTime() <= new Date().getTime()) {
      alert("Deadline date should be bigger than current");
      return;
    }

    this.taskService.createTask(this.task)
      .subscribe(result => {
        this.goToAllTasks();
      })  
  }
}
