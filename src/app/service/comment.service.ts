import { BaseService } from './base-service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentCreateDTO } from '../model/commentCreateDTO.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
  })
}

const httpOptionsTextResponse = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
    
  }),
  responseType: 'text' as 'json'
}


@Injectable({
    providedIn: 'root'
  })
  export class CommentService extends BaseService{

    constructor(protected http: HttpClient) {
      super(http);
      this.apiUrl += '/questions/${questionId}/answers';
    }
  
    createComment(commentCreateDTO: CommentCreateDTO, answerId: number) : Observable<Comment> {
      return this.http.post<Comment>(`${this.apiUrl}/${answerId}/comments/create`,
                                     commentCreateDTO, httpOptions)
    }
  
    deleteComment(answerId: number, commentId: number): Observable<string> {
      return this.http.delete<string>(`${this.apiUrl}/${answerId}/comments/${commentId}`,
                                   httpOptionsTextResponse)
    }

    editComment(answerId: number, commentId: number, comment: Comment): Observable<Comment> {
      return this.http.put<Comment>(`${this.apiUrl}/${answerId}/comments/${commentId}`,
                                     comment,  httpOptionsTextResponse);
    }
  }