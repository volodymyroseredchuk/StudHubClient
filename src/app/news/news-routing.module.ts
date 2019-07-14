import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsPageComponent } from './news-page/news-page.component';


const routes: Routes = [
    {
      path: 'news',
      component: NewsComponent
    },

    {
      path: 'news/:id',
      component: NewsPageComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewsRoutingModule {}