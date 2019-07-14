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
import { FooterComponent } from './footer/footer.component';
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
import { ChatComponent } from './chat/chat.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { SafeHtmlPipe } from './safe-html.pipe';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    EditProfileComponent,
    ChatComponent,
    ChatlistComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagsModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    MatSnackBarModule,
    FeedbackModule,
    SocialLoginModule,
    MatTabsModule,
    CKEditorModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     QuestionsComponent, QuestionsPageComponent, QuestionsEditComponent,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
