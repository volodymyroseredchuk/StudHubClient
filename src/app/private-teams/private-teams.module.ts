import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { PrivateTeamsRoutingModule } from './private-teams-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';


@NgModule({
  declarations: [TeamsComponent, TeamsCreateComponent, TeamPageComponent, TeamsEditComponent],
  imports: [
    CommonModule,
    PrivateTeamsRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule
  ]
})
export class PrivateTeamsModule { }
