import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { TeamQuestionsCreateComponent } from './questions-create/questions-create.component';
import { TeamQuestionsPageComponent } from './question-page/questions-page.component';
import { TeamQuestionsEditComponent } from './questions-edit/questions-edit.component';


const routes: Routes = [
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/create',
    component: TeamsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/:id',
    component: TeamPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/:id/edit',
    component: TeamsEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/:id/questions/create',
    component: TeamQuestionsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teams/:id/questions/:id',
    component: TeamQuestionsPageComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'teams/:id/questions/:id/edit',
    component: TeamQuestionsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateTeamsRoutingModule {}

