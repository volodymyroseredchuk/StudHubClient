<<<<<<< HEAD:studhub/src/app/home/home-routing.module.ts
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from "../profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
=======
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags.component';

const routes: Routes = [
  {
    path: 'tags',
    component: TagsComponent
>>>>>>> 9a41a375b7239708a19f5ee6eaddf3a1a5fe8bbb:studhub/src/app/tags/tags-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD:studhub/src/app/home/home-routing.module.ts
export class HomeRoutingModule {
}
=======
export class TagsRoutingModule { }
>>>>>>> 9a41a375b7239708a19f5ee6eaddf3a1a5fe8bbb:studhub/src/app/tags/tags-routing.module.ts
