import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { UserDTO } from 'src/app/model/userDTO.model';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {

  user: UserDTO;
  team: Team = new Team();
  teamCreateForm: FormGroup;
  submitted = false;

  constructor(private teamService: TeamService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.team.isPublic = true;
    
    this.teamCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.getUser();
  }


  onItemChange(value){

    if(value === 1){
      this.team.isPublic = true;
    } else {
      this.team.isPublic = false;
    }
    console.log(this.team);
  }

  async getUser() {
    await this.userService.getCurrentUser().toPromise().then(user => this.user = user);
  }
  // convenience getter for easy access to form fields
  get f() { return this.teamCreateForm.controls; }

  goBack() {
    this.router.navigate(['/teams']);
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.teamCreateForm.invalid) {
      return;
    }
    
    console.log(this.team);

    this.teamService.createTeam(this.team)
      .subscribe(result => {
        console.log(result);
        this.goBack();
      })
  }
}
