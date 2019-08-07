import { OnInit, Component } from '@angular/core';
import { NewsForListDTO } from '../model/newsForListDTO.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../service/news.service';
import { Feed } from '../model/feed.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],

})
export class NewsComponent implements OnInit {

  newsList: NewsForListDTO[] = [];
  feedList: Feed[] = [];
  userFeedList: Feed[] = [];
  newsTotalCount: number;
  pageSize: number = 5;
  page: number = 1;
  user: User;


  constructor(private router: Router, private service: NewsService, private activRouter: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllNews();
    
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
      }, () => {
        this.user = null;
      }
    )
  }

  getAllNews() {

    this.service.getAllFeeds().subscribe(feeds => {
      this.feedList = feeds;
    });

    if (!this.user) {
      this.service.getUserFeeds().subscribe(userfeeds => {
        this.userFeedList = userfeeds;
      });      
    }  
  }

  followChannel(id: number){
    this.service.followChannel(id).subscribe(data=>{
      if(data==="feed added"){
        alert(data);
      }else if(data==="feed removed"){
        alert(data);
      }
    })
  }
}