import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeachersCreateComponent } from './teachers-create/teachers-create.component';
import { TeachersPageComponent } from './teacher-page/teachers-page.component';

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
    path: 'teachers/:id',
    component: TeachersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule {}

