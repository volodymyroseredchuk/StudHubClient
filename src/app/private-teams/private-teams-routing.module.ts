import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';


const routes: Routes = [
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'teams/create',
    component: TeamsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/:id',
    component: TeamPageComponent
  },
  {
    path: 'teams/:id/edit',
    component: TeamsEditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateTeamsRoutingModule {}

