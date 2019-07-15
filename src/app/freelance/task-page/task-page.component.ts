import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { TaskService } from 'src/app/service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ProposalService } from 'src/app/service/proposal.service';
import { Proposal } from 'src/app/model/proposal.model';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { FreelancerDTO } from 'src/app/model/freelancerDTO.model';
import { AlertService } from 'src/app/service/alert.service';
import { first } from 'rxjs/operators';
import { CustomerDTO } from 'src/app/model/customerDTO.model';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  task: Task;
  freelancer: FreelancerDTO = new FreelancerDTO();
  customer: CustomerDTO = new CustomerDTO();
  taskId: number;
  proposals: Proposal[] = [];
  proposalsTotalCount: number;
  pageSize: number = 5;
  page: number = 1;
  user: User;
  formFreelancer = new FormGroup({
    quality: new FormControl(''),
    price: new FormControl(''),
    velocity: new FormControl(''),
    contact: new FormControl('')
  });
  formCustomer = new FormGroup({
    payment: new FormControl(''),
    formulation: new FormControl(''),
    clarity: new FormControl(''),
    contact: new FormControl('')
  });

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

  onSubmitFreelancer() {
    console.log(this.freelancer);

    if (!this.freelancer.quality || !this.freelancer.price || !this.freelancer.velocity
      || !this.freelancer.contact) {
      alert("Choose all critery");
      return;
    }
    this.userService.rateFreelancer(this.freelancer, 1)
      .subscribe(res => {
        console.log(res);
      })
  }

  onSubmitCustomer() {
    console.log(this.customer);

    if (!this.customer.payment || !this.customer.formulation || !this.customer.clarity
      || !this.customer.contact) {
      alert("Choose all critery");
      return;
    }
    this.userService.rateCustomer(this.customer, 1)
      .subscribe(res => {
        console.log(res);
      })
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getProposals();
  }

  getCurrentPaginationSettings(): string {
    return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }

  getTask() {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
      },
      err => {
          this.router.navigate(["errorPage"]);
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

  canDeleteProposal(proposal) {
    if (!this.user) {
      return false;
    }
    let allowDelete = this.user.username === proposal.user.username;
    if (allowDelete) {
      return true;
    } else {
      for (let privilege of this.user.privileges) {
        if (privilege.name.toUpperCase() === "PROPOSAL_DELETE_ANY_PRIVILEGE" ) {
          return true;
        }
      }
      return false;
    }
  }

  canModifyTask() {
    if (!this.user) {
      return false;
    }
    let allow = this.user.username === this.task.user.username;
    if (allow) {
      return true;
    } else {
      for (let privilege of this.user.privileges) {
        if (privilege.name.toUpperCase() === "TASK_DELETE_ANY_PRIVILEGE" ) {
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
}
