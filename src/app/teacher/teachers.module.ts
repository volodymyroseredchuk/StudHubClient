import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersCreateComponent } from './teachers-create/teachers-create.component';
import { TeachersComponent } from './teachers.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { TeachersPageComponent } from './teacher-page/teachers-page.component';
import {AppComponent} from "../app.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [TeachersCreateComponent, TeachersComponent, TeachersPageComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule

  ]
})


export class TeachersModule { }


