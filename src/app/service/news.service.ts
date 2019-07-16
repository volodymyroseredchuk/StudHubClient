import { BaseService } from './base-service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsPaginatedDTO } from '../model/newsPaginatedDTO.model';
import { News } from '../model/news.model';

const httpOptionsTextResponse = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken'),

    }),
    responseType: 'text' as 'json'
}

@Injectable({
    providedIn: 'root'
})
export class NewsService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/news';
    }

    getAllNews(paginationSettings: string): Observable<NewsPaginatedDTO> {
        return this.http.get<NewsPaginatedDTO>(`${this.apiUrl}` + paginationSettings);
    }

    showNewsPage(id: number): Observable<News> {
        return this.http.get<News>(`${this.apiUrl}/${id}`);
    }

}