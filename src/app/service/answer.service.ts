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
export class AnswerService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/questions';
  }

  createAnswer(answerCreateDTO: AnswerCreateDTO, questionId:number) : Observable<Answer> {
    return this.http.post<Answer>(`${this.apiUrl}/${questionId}/answers`, answerCreateDTO, httpOptions)
  }

  deleteAnswer(questionId: number, answerId: number){
    return this.http.delete<any>(`${this.apiUrl}/${questionId}/answers/${answerId}/delete`, httpOptions)
  }

  approveAnswer(questionId:number, answerId: number, approved: boolean){
    return this.http.put<AnswerApproveDTO>(`${this.apiUrl}/${questionId}/answers/${answerId}/approve`, approved.toString(), httpOptions )
  }
}
