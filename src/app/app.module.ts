import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TagsModule } from './tags/tags.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsPageComponent } from './questions/question-page/questions-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule, MatTabsModule} from '@angular/material';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { QuestionsEditComponent } from './questions/questions-edit/questions-edit.component';
import {FeedbackModule} from './feedback/feedback.module';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { provideConfig } from '../socialloginConfig';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NewsModule } from './news/news.module';
import { NewsComponent } from './news/news.component';
import { NewsPageComponent } from './news/news-page/news-page.component';
import { FreelanceModule } from './freelance/freelance.module';
import { PrivateTeamsModule } from './private-teams/private-teams.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import {TeachersModule} from "./teacher/teachers.module";
import {UniversitiesModule} from "./universities/universities.module";
import { ChatComponent } from './chat/chat.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import {TeachersComponent} from './teacher/teachers.component';
import {TeachersPageComponent} from './teacher/teacher-page/teachers-page.component';
import {TeachersCreateComponent} from './teacher/teachers-create/teachers-create.component';
import {UniversitiesCreateComponent} from './universities/university-create/universities-create.component';
import {UniversitiesPageComponent} from './universities/university-page/universities-page.component';
import {UniversitiesComponent} from './universities/universities.component';
import {OrderModule} from './order/order.module';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    EditProfileComponent,
    ErrorPageComponent,
    ChatComponent,
    ChatlistComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagsModule,
    PrivateTeamsModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionsModule,
    NewsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    MatSnackBarModule,
    FeedbackModule,
    SocialLoginModule,
    MatTabsModule,
    CKEditorModule,
    OrderModule,
    FreelanceModule,
    MatTabsModule,
    TeachersModule,
    UniversitiesModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     QuestionsComponent, QuestionsPageComponent, QuestionsEditComponent, NewsComponent, NewsPageComponent,
     QuestionsComponent, QuestionsPageComponent, QuestionsEditComponent, TeachersComponent, TeachersPageComponent,
    TeachersCreateComponent, UniversitiesCreateComponent, UniversitiesPageComponent, UniversitiesComponent,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
