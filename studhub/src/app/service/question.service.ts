import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../model/question.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

    deleteQuestion(id: number): Observable <string>{
      return this.http.delete<string>(`${this.apiUrl}/${id}`);
      //return "message";
    }

    showQuestionPage(id: number): Observable <Question>{
      return this.http.get<Question>(`${this.apiUrl}/${id}`);
    }

    searchQuestionsByKeywords(searchPattern: string): Observable<Question[]> {
      return this.http.get<Question[]>(`${this.apiUrl}/search/` + searchPattern);
    }

    searchQuestionsByTags(searchPattern: string): Observable<Question[]> {
      return this.http.get<Question[]>(`${this.apiUrl}/tagged/` + searchPattern);
    }
  }