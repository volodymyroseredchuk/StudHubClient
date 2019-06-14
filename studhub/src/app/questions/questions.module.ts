import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsCreateComponent } from './questions-create/questions-create.component';
import { QuestionsComponent } from './questions.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionsCreateComponent, QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class QuestionsModule { }
