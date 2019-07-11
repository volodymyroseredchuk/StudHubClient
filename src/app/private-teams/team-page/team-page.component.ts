import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/model/team.model';
import { QuestionForListDTO } from 'src/app/model/questionForListDTO.model';
import { QuestionService } from 'src/app/service/question.service';
import { MatSnackBar } from '@angular/material';
import { TeamQuestionService } from 'src/app/service/team-question.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  team: Team;
  teamId: number;
  pageSize: number = 5;
  page: number = 1;
  questions: QuestionForListDTO[] = [];
  questionsTotalCount: number;
  user: User;

  constructor(private teamService: TeamService,
    private teamQuestionService: TeamQuestionService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.teamId = +this.route.snapshot.params.id;
    this.getTeam();
    this.getUser();
    this.getTeamQuestions();
  }

  changePage(currentPage: number) {
    this.page = currentPage;
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }

  getTeam() {
    this.teamService.getTeam(this.teamId)
      .subscribe(team => {
        console.log(team);
        this.team = team;
      },
      err => {
        this.router.navigate(["errorPage"]);
      });
  }

  getTeamQuestions() {
    this.teamQuestionService.getAllQuestionsByTeamId(this.teamId, this.getCurrentPaginationSettings())
      .subscribe(questionPaginated => {
        console.log(questionPaginated);
        this.questions = questionPaginated.questions;
        this.questionsTotalCount = questionPaginated.questionsTotalCount;
      },
      err => {
        console.log(err);
      })
  }

  getUser() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
      }, err => {
        this.user = null;
      }
    )
  }

  canDeleteQuestion(question){
    if(!this.user) { 
      return false; 
    }
    let allowDelete = this.user.username === question.user.username;
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

  canModifyTeam() {
    if(!this.user) { 
      return false; 
    }
    let allow = this.user.username === this.team.user.username;
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

  deleteTeam() {
    if (window.confirm("Do you really want to delete this team?")) {
      this.teamService.deleteTeam(this.teamId)
        .subscribe(deleteMessage => {
          alert(deleteMessage.message);
          this.router.navigate(["/teams"])
      })
    }
  }

  deleteQuestion(questionId: number) {
    if (window.confirm("Do you really want to delete this question?")) {
      this.teamQuestionService.deleteQuestion(this.teamId, questionId)
        .subscribe(deleteMessage => {
          this.deleteQuestionFromList(deleteMessage.message, questionId);
          this.changePage(1);
      });
    }
  }

  deleteQuestionFromList(message: string, questionId: number) {
    if(message){
      this.questions = this.questions.filter(function (value, index, arr) {
        return value.id !== questionId;
    })
    }

  }
}