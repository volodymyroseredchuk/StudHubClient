import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeachersRoutingModule} from './teachers-routing.module';
import {TeachersCreateComponent} from './teachers-create/teachers-create.component';
import {TeachersComponent} from './teachers.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {TeachersPageComponent} from './teacher-page/teachers-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {StarRatingModule} from 'angular-star-rating';

@NgModule({
    declarations: [TeachersCreateComponent, TeachersComponent, TeachersPageComponent],
    imports: [
        CommonModule,
        TeachersRoutingModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        NgxPaginationModule,
        StarRatingModule.forRoot()

    ]
})


export class TeachersModule {
}


