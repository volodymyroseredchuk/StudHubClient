import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/question.model';

@Injectable({
    providedIn: 'root'
  })
  export class QuestionService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/question';
      }

    createQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(`${this.apiUrl}/create`, question);
    }
  }