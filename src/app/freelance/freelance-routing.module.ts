import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { AuthGuard } from '../_guards';
import { TaskPageComponent } from './task-page/task-page.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit.component';
import { ProposalsCreateComponent } from './proposals-create/proposals-create.component';


const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'tasks/create',
    component: TasksCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: TaskPageComponent
  },
  {
    path: 'tasks/:id/edit',
    component: TasksEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id/proposals/create',
    component: ProposalsCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelanceRoutingModule {}

