import { BaseService } from './base-service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsPaginatedDTO } from '../model/newsPaginatedDTO.model';
import { News } from '../model/news.model';
import { Feed } from '../model/feed.model';

const httpOptionsTextResponse = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken'),

    }),
    responseType: 'text' as 'json'
}

let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('accessToken')}`
  });
  let options = { headers: headers };

@Injectable({
    providedIn: 'root'
})
export class NewsService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/news';
    }

    getAllFeeds(): Observable<any> {
        
        return this.http.get<Feed[]>(`${this.apiUrl}`, options);
    }

    showNewsPage(id: number): Observable<News[]> {
        return this.http.get<News[]>(`${this.apiUrl}/${id}`);
    }

    followChannel(id: number): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/${id}/follow`, httpOptionsTextResponse);
    }

    getUserFeeds(): Observable<any> {
        
        return this.http.get<Feed[]>(`${this.apiUrl}/userfeeds`, options);
    }

}