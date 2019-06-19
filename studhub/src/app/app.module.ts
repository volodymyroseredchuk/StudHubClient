import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TagsModule } from './tags/tags.module';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsModule } from './questions/questions.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsPageComponent } from './questions/question-page/questions-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagsModule,
    FormsModule,
    QuestionsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [QuestionsComponent, QuestionsPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
