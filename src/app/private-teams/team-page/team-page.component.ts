import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  team: Team;
  teamId: number;
  pageSize: number = 10;
  page: number = 1;
  user: User;

  constructor(private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.teamId = +this.route.snapshot.params.id;
    this.getTeam();
    this.getUser();
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

  goBack(): void {
    this.location.back();
  }
}