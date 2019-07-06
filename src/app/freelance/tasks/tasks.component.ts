import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

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

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getAllTasks();
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }
}
