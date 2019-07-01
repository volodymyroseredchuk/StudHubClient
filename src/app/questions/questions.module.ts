import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsCreateComponent } from './questions-create/questions-create.component';
import { QuestionsComponent } from './questions.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { QuestionsPageComponent } from './question-page/questions-page.component';
import { QuestionsEditComponent } from './questions-edit/questions-edit.component';
import { AnswerComponent } from './answer/answer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [QuestionsCreateComponent, QuestionsComponent, QuestionsPageComponent,
                 QuestionsEditComponent, AnswerComponent, CommentComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule
  ]
})
export class QuestionsModule { }
