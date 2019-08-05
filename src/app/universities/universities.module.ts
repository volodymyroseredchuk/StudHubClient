import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesCreateComponent } from './universities-create/universities-create.component';
import { UniversitiesComponent } from './universities.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { UniversitiesPageComponent } from './university-page/universities-page.component';

import {NgxPaginationModule} from "ngx-pagination";
import {StarRatingModule} from 'angular-star-rating';

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
    NgxPaginationModule,
    StarRatingModule.forRoot()

  ]
})


export class UniversitiesModule { }


