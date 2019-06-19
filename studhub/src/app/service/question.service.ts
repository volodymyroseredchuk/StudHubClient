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
        this.apiUrl += '/questions';
      }

    createQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(`${this.apiUrl}/create`, question);
    }

    getAllQuestions(): Observable<Question[]> {
      return this.http.get<Question[]>(`${this.apiUrl}`);
    }

    editQuestion(questionId: number , question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${questionId}/edit`, question);
    }

    deleteQuestion(questionId: number): Observable <any>{
      return this.http.delete(`${this.apiUrl}/${questionId}/delete`);
    }

    showQuestionPage(id: number): Observable <Question>{
      return this.http.get<Question>(`${this.apiUrl}/${id}`);
    }

  }