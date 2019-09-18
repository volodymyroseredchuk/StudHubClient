import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ChatComponent } from "./chat/chat.component";
import { ChatlistComponent } from "./chatlist/chatlist.component";
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "errorPage",
    component: ErrorPageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:username',
    component: ProfileComponent
  },
  {
    path: 'chat/:chatId/:secret',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chatlist',
    component: ChatlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
