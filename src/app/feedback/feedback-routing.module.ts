import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbacksComponent } from './feedbacks.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';

const routes: Routes = [
  {
    path: 'feedback',
    component: FeedbacksComponent
  },
  {
    path: 'feedback/feedback',
    component: FeedbackCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
