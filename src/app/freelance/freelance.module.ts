import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelanceRoutingModule } from './freelance-routing.module';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { TasksComponent } from './tasks/tasks.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit.component';
import { ProposalsCreateComponent } from './proposals-create/proposals-create.component';
import { CreatedOrdersComponent } from './created-orders/created-orders.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';


@NgModule({
  declarations: [TasksComponent, TasksCreateComponent, TaskPageComponent, TasksEditComponent, ProposalsCreateComponent, CreatedOrdersComponent, AssignedOrdersComponent],
  imports: [
    CommonModule,
    FreelanceRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule
  ]
})
export class FreelanceModule { }
