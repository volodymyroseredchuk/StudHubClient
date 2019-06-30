import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent implements OnInit {

  task: Task = new Task();
  taskId: number;
  taskUpdateForm: FormGroup;
  submitted = false;

  constructor(private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.params.id;

    this.taskUpdateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      expectedPrice: ['', Validators.required]
    });
    
    this.getTask();
  }

  getTask() {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        alert("Task was updated successfully");
        this.task = task;
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.taskUpdateForm.controls; }

  goToAllTasks() {
    this.router.navigate(['/tasks']);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskUpdateForm.invalid) {
      return;
    }

    if (new Date(this.task.deadlineDate).getTime() <= new Date().getTime()) {
      alert("Deadline date should be bigger than current");
      return;
    }

    this.taskService.editTask(this.taskId, this.task)
      .subscribe(result => {
        this.goToAllTasks();
      })
  }

  goBack(): void {
    this.location.back();
  }
}
