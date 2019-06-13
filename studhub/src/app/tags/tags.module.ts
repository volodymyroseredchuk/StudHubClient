import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule
  ]
})
export class TagsModule { }
