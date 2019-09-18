import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/model/team.model';
import { QuestionForListDTO } from 'src/app/model/questionForListDTO.model';
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
  pageSize: number = 4;
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
    this.getUser();
    this.getTeam();
    this.getTeamQuestions();
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getTeamQuestions();
  }

  getCurrentPaginationSettings(): string {
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
        console.log(this.questions);
      },
        err => {
          console.log(err);
        })
  }

  isMember() {

    if (!this.user) {
      return false;
    }

    return this.memberExists();
  }

  isNotMember(){

    let allow = true;

    if(this.team.user.username === this.user.username){
      allow = false;
    }
    this.team.userList.forEach(e => {
      console.log(e);
      if(e.username == this.user.username){
        allow = false;
      }
    })
    console.log(allow);
    return allow;
  }

  leaveTeam() {
    if (window.confirm("Do you really want to leave this team?")) {
      this.teamService.leaveTeam(this.teamId, this.user.id)
        .subscribe(res => {
          console.log(res);
          this.team = res;
        })
    }
  }

  joinTeam() {
    this.teamService.joinTeam(this.teamId, this.user.id)
      .subscribe(res => {
        this.team = res;
        console.log(this.team);
      })
    
  }

  memberExists() {
    let allow = false;
    this.team.userList.forEach(e => {
      console.log(e);
      if(e.username == this.user.username){
        allow = true;
      }
    })
    console.log(allow);
    return allow;
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


  canModifyTeam() {
    if (!this.user) {
      return false;
    }
    let allow = this.user.username === this.team.user.username;
    if (allow) {
      return true;
    } else {
      for (let privilege of this.user.privileges) {
        if (privilege.name.toUpperCase() === "WRITE_ANY_TEAM_PRIVILEGE") {
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
          this.router.navigate(["/teams"])
        })
    }
  }

}