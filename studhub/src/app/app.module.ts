import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TagsModule } from './tags/tags.module';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    TagsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
