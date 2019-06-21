import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackComponent } from './feedback.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedbackCreateComponent, FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class FeedbackModule { }
