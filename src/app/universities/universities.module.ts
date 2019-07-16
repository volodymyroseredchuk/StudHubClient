import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesCreateComponent } from './university-create/universities-create.component';
import { UniversitiesComponent } from './universities.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { UniversitiesPageComponent } from './university-page/universities-page.component';

import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [UniversitiesCreateComponent, UniversitiesComponent, UniversitiesPageComponent],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule

  ]
})


export class UniversitiesModule { }


