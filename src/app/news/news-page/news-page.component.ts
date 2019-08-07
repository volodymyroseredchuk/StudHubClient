import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

    news: News;
    public newsList: News[];

    constructor(private newsService: NewsService, private route: ActivatedRoute,
        private router: Router, private location: Location, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.getNews();
    }

    getNews() {
        const id = +this.route.snapshot.params.id;
        this.newsService.showNewsPage(id)
          .subscribe(newsList => {
            this.newsList = newsList;
          },
            error => {
              alert(error);
              this.alertService.error(error);
              this.router.navigate(["/news"]);
    
            });
      }
    
      //"back" button
      goBack(): void {
        this.location.back();
      }


}