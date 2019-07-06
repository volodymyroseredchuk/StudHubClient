import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/team.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  teamsTotalCount: number;
  pageSize: number = 10;
  page: number = 1;

  constructor(private router: Router, 
    private teamService: TeamService) { }

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getAllTeams(this.getCurrentPaginationSettings())
      .subscribe(teamsPaginated => {
        this.teams = teamsPaginated.teams;
        this.teamsTotalCount = teamsPaginated.teamsTotalCount;
      });
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getAllTeams();
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }
}
