import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionsCreateComponent } from './questions-create/questions-create.component';
import { QuestionsPageComponent } from './question-page/questions-page.component';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'questions/create',
    component: QuestionsCreateComponent
  },

  {
    path: 'questions/ :id',
    component: QuestionsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}

