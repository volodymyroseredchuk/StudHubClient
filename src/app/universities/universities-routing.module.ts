import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitiesComponent } from './universities.component';
import { UniversitiesCreateComponent } from './university-create/universities-create.component';
import { UniversitiesPageComponent } from './university-page/universities-page.component';

const routes: Routes = [
  {
    path: 'universities',
    component: UniversitiesComponent
  },
  {
    path: 'universities/create',
    component: UniversitiesCreateComponent
  },

  {
    path: 'universities/:id',
    component: UniversitiesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversitiesRoutingModule {}

