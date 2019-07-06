import { Component, OnInit } from '@angular/core'
import { Task } from 'src/app/model/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {

  team: Team = new Team();

  teamCreateForm: FormGroup;
  submitted = false;

  constructor(private teamService: TeamService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.teamCreateForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamCreateForm.controls; }

  goToAllTeams() {
    this.router.navigate(['/teams']);    
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.teamCreateForm.invalid) {
          return;
    }
    
    this.teamService.createTeam(this.team)
      .subscribe(result => {
        alert("Team was successfully created");
        this.goToAllTeams();
      })  
  }

  goBack(): void {
    this.location.back();
  }
}
