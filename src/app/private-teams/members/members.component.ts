import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from 'src/app/service/team.service';
import { Team } from 'src/app/model/team.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { UserDTO } from 'src/app/model/userDTO.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  usersCtrl = new FormControl();
  filteredUsers: Observable<UserDTO[]>;
  users: UserDTO[];
  selectedUser: UserDTO;
  user: User;
  submitted = false;
  teamId;
  team: Team;

  constructor(private teamService: TeamService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    
    this.teamId = +this.route.snapshot.params.id;

    this.getTeam();
    this.getUser();
    this.getAllUsers();
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

  async getAllUsers() {

    await this.userService.getAllUsers().toPromise().then(data => {
      this.users = data;
    }).then(() => {
      this.filteredUsers = this.usersCtrl.valueChanges
        .pipe(
          map(user => user ? this._filterUsers(user) : undefined)
        );
    });
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

  goBack() {
    this.router.navigate(['/teams/' + this.teamId]);
  }

  deleteMember(user: UserDTO) {
    if (window.confirm("Do you really want to kick this user?")) {
      console.log(this.team);
      this.team.userList = this.team.userList.filter(member => member != user);
      console.log(this.team);
      this.teamService.editTeam(this.teamId, this.team)
      .subscribe(result => {
        console.log(result);
      })
    } 
    
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
    if (this.selectedUser) {
      if (this.memberExists()) {
        alert("member exists");
      } else if (this.selectedUser.username == this.user.username) {
        alert("Team owner cannot be a member");
      } else {
        this.team.userList.push(this.selectedUser);
      }
    } else {
      alert("user doesn't exist");
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

  memberExists() {
    return this.team.userList.includes(this.selectedUser);
  }

  onSubmit() {
    this.submitted = true;

    this.team.userList = this.team.userList;

    this.teamService.editTeam(this.teamId, this.team)
      .subscribe(result => {
        console.log(result);
        this.goBack();
      })
  }
}
