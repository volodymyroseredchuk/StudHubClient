import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeachersCreateComponent } from './teachers-create/teachers-create.component';
import { TeachersPageComponent } from './teacher-page/teachers-page.component';
import {TeachersEditComponent} from './teachers-edit/teachers-edit.component';

const routes: Routes = [
  {
    path: 'teachers',
    component: TeachersComponent
  },
  {
    path: 'teachers/teacher',
    component: TeachersCreateComponent
  },

  {
    path: 'update/:id',
    component: TeachersEditComponent
  },

  {
    path: 'teachers/:id',
    component: TeachersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule {}

