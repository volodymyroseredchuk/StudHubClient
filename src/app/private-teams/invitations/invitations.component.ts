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
import { Invitation } from 'src/app/model/invitation.model';
import { InvitationService } from 'src/app/service/invitation.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  usersCtrl = new FormControl();
  filteredUsers: Observable<UserDTO[]>;
  users: UserDTO[];
  selectedUser: UserDTO;
  user: User;
  submitted = false;
  teamId;
  team: Team;
  invitations: Invitation[];
  invitation: Invitation;

  constructor(private teamService: TeamService,
    private userService: UserService,
    private invitationService: InvitationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {

    this.teamId = +this.route.snapshot.params.id;

    this.getTeam();
    this.getUser();
    this.getInvitation();
  }

  getInvitation() {

    this.invitationService.getInvitation(this.teamId)
      .subscribe(res => {
        console.log(res);
        this.invitations = res;
        this.invitation = this.invitations[0];
      })
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

  async cancelInvitation() {
    if (window.confirm("Do you really want to cancel this invitation?")) {
      console.log(this.team);
      this.team.invitations = this.team.invitations.filter(invitation => invitation != this.invitation);
      console.log(this.team);
      await this.deleteInvitation();
    }
    this.goBack();
  }

  deleteInvitation() {
    this.invitationService.deleteInvitation(this.teamId, this.invitation.id)
      .subscribe(result => {
        console.log(result);
      })
  }
  async acceptInvitation() {

    this.team.userList.push(this.user);
    await this.invitationService.acceptInvitation(this.teamId, this.invitation.id, this.team)
      .subscribe(result => {
        console.log(result);
      });
    console.log("added");
    await this.deleteInvitation();
    console.log("deleted");
    this.goBack();
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
