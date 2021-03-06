import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './news-page/news-page.component';

@NgModule({
    declarations: [NewsComponent, NewsPageComponent],
    imports: [
      NewsRoutingModule,
      CommonModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
      MatInputModule,
      MatAutocompleteModule,
      NgxPaginationModule
    ]
  })
  export class NewsModule { }