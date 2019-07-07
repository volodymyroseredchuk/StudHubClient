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

  usersCtrl = new FormControl();
  filteredUsers: Observable<UserDTO[]>;
  users: UserDTO[];
  members: UserDTO[] = [];
  selectedUser: UserDTO;
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
    this.teamCreateForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.getAllUsers();
  }

  async getAllUsers() {

    await this.userService.getAllUsers().toPromise().then(data => {
      this.users = data;
      console.log(this.users);
    }).then(() => {
      this.filteredUsers = this.usersCtrl.valueChanges
        .pipe(
          map(user => user ? this._filterUsers(user) : this.users.slice())
        );
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamCreateForm.controls; }

  goToAllTeams() {
    this.router.navigate(['/teams']);
  }

  private _filterUsers(value: string): UserDTO[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.username.toLowerCase().indexOf(filterValue) === 0);
  }

  getUserFromUsername(username: string) {
    this.selectedUser = this.users.find(user => {
      return user.username === username
    });
  }

  addMember() {

    console.log(this.selectedUser);
    if(this.selectedUser){
      if(this.memberExists()){
        alert("member exists");
      } else {
        this.members.push(this.selectedUser);
      }
    } else {
      alert("user doesn't exist");
    }
      
  }

  memberExists() {
      return this.members.includes(this.selectedUser);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.teamCreateForm.invalid) {
      return;
    }

    this.team.userList = this.members;

    this.teamService.createTeam(this.team)
      .subscribe(result => {
        console.log(result);
        alert("Team was successfully created");
        this.goToAllTeams();
      })
  }

  goBack(): void {
    this.location.back();
  }
}
