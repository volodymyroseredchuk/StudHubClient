import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { BaseService } from './base-service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnswerCreateDTO} from './../model/answerCreateDTO.model';
import { AnswerApproveDTO} from './../model/answerApproveDTO.model';
import {Answer} from './../model/answer.model';

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
export class VoteService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/votes';
  }

  upvoteAnswer(answerId: number){
      return this.http.post<any>(
        `${this.apiUrl}`, 
        {
          'answerId': answerId,
          'feedbackId': null,
          'value': 1
        },
        httpOptions
      )
  }

  downvoteAnswer(answerId: number){
    return this.http.post<any>(
      `${this.apiUrl}`, 
      {
        'answerId': answerId,
        'feedbackId': null,
        'value': -1
      },
      httpOptions
    )
  }
  
  resetVoteAnswer(answerId: number) {
    return this.http.post<any>(
      `${this.apiUrl}`, 
      {
        'answerId': answerId,
        'feedbackId': null,
        'value': 0
      },
      httpOptions
    )
  }

  getAnswerVotesForQuestion(questionId: number){
    return this.http.get<any>(`${this.apiUrl}/question/${questionId}`, httpOptions);
  }

  getSumOfVotesByUsername(username: String) {
    return this.http.get<number>(`${this.apiUrl}/sum/${username}`);
  }
}
