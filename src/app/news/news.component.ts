import { OnInit, Component } from '@angular/core';
import { NewsForListDTO } from '../model/newsForListDTO.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],

})
export class NewsComponent implements OnInit {

  newsList: NewsForListDTO[] = [];
  newsTotalCount: number;
  pageSize: number = 5;
  page: number = 1;


  constructor(private router: Router, private service: NewsService, private activRouter: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("in newscomponent");
    this.getAllNews();
  }

  getAllNews() {
    this.service.getAllNews(this.getCurrentPaginationSettings())
      .subscribe(newsPaginatedDTO => {
        this.newsList = newsPaginatedDTO.news;
        this.newsTotalCount = newsPaginatedDTO.newsTotalCount;
      });
  }

  getCurrentPaginationSettings() : string {
    return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
}

}