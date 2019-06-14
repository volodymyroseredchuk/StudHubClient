import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsCreateComponent } from './questions-create/questions-create.component';
import { QuestionsComponent } from './questions.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [QuestionsCreateComponent, QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MaterialModule
  ]
})
export class QuestionsModule { }
