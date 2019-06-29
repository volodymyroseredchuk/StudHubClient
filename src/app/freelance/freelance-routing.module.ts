import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { AuthGuard } from '../_guards';


const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'tasks/create',
    component: TasksCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelanceRoutingModule {}

