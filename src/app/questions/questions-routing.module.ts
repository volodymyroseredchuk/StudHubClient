import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionsCreateComponent } from './questions-create/questions-create.component';
import { QuestionsPageComponent } from './question-page/questions-page.component';
import { QuestionsEditComponent } from './questions-edit/questions-edit.component';
import { AuthGuard } from '../_guards';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'questions/create',
    component: QuestionsCreateComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'questions/:id',
    component: QuestionsPageComponent
  },

  {
    path: 'questions/:id/edit',
    component: QuestionsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}

