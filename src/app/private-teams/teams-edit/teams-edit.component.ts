import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {

  team: Team = new Team();
  teamId: number;
  teamUpdateForm: FormGroup;
  submitted = false;

  constructor(private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.teamId = +this.route.snapshot.params.id;

    this.teamUpdateForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    
    this.getTeam();
  }

  getTeam() {
    this.teamService.getTeam(this.teamId)
      .subscribe(team => {
        this.team = team;
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamUpdateForm.controls; }

  goBack() {
    this.router.navigate(['/teams/' + this.teamId]);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.teamUpdateForm.invalid) {
      return;
    }

    this.teamService.editTeam(this.teamId, this.team)
      .subscribe(result => {
        console.log(result);
        this.goBack();
      })
  }
}
