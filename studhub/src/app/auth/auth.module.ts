import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../_components/alert.component';
import { PasswordResetComponent } from './password_reset/password_reset.component';
import { PasswordForgotComponent } from './password_forgot/password_forgot.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
