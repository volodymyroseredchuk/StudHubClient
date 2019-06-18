import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { MaterialModule } from '../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class TagsModule { }
