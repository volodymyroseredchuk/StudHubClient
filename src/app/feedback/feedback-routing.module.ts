import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';

const routes: Routes = [
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'feedback/create',
    component: FeedbackCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
