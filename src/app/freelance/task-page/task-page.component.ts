import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { TaskService } from 'src/app/service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ProposalService } from 'src/app/service/proposal.service';
import { Proposal } from 'src/app/model/proposal.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  task: Task;
  taskId: number;
  proposals: Proposal[] = [];
  proposalsTotalCount: number;
  pageSize: number = 5;
  page: number = 1;
  user: User;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private proposalService: ProposalService) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.params.id;
    this.getTask();
    this.getUser();
    this.getProposals();
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getProposals();
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }

  getTask() {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
      })
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
      }, err => {
        this.user = null;
      }
    )
  }

  getProposals() {
    this.proposalService.getAllProposalsByTaskId(this.taskId, this.getCurrentPaginationSettings())
      .subscribe(proposalPaginated => {
        this.proposals = proposalPaginated.proposals;
        this.proposalsTotalCount = proposalPaginated.proposalsTotalCount;
      })
  }

  canDeleteProposal(proposal){
    if(!this.user) { 
      return false; 
    }
    let allowDelete = this.user.username === proposal.user.username;
    if (allowDelete) {
      return true;
    } else {
      for(let role of this.user.roles) {
        if(role.name.toUpperCase() === "ROLE_MODERATOR" || role.name.toUpperCase() === "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }

  canModifyTask() {
    if(!this.user) { 
      return false; 
    }
    let allow = this.user.username === this.task.user.username;
    if (allow) {
      return true;
    } else {
      for(let role of this.user.roles) {
        if(role.name.toUpperCase() === "ROLE_MODERATOR" || role.name.toUpperCase() === "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }

  deleteTask() {
    if (window.confirm("Do you really want to delete this task?")) {
      this.taskService.deleteTask(this.taskId)
        .subscribe(deleteMessage => {
          /*TODO
          send deleteMessage.message to tasks component */
          this.router.navigate(["/tasks"])
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteProposal(proposalId: number) {
    if (window.confirm("Do you really want to delete this proposal?")) {
      this.proposalService.deleteProposal(this.taskId, proposalId)
        .subscribe(deleteMessage => {
          this.deleteProposalFromList(deleteMessage.message, proposalId);
          this.changePage(1);
      });
    }
  }

  deleteProposalFromList(message: String, proposalId: number) {
    if (message === "Proposal was successfully deleted") {
      this.proposals = this.proposals.filter(function (value, index, arr) {
        return value.id !== proposalId;
      })
    }
  }

  approveProposal(proposalId : number, proposalUsername: string) {
    if(confirm(`Are you sure you want to hire ${proposalUsername} for executing this task?`)){
      this.proposalService.approveProposal(this.taskId, proposalId).subscribe(
        order  => {
          this.router.navigate([`/orders/${order.id}`])
        }
      )
    }

  }
}
