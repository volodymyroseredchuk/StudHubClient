import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../model/question.model';
import { QuestionPaginatedDTO } from '../model/questionPaginatedDTO.model';

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
export class QuestionService extends BaseService {

  questions: Observable<Question[]>
  private subjectQuestions: BehaviorSubject<Question[]>;
  private dataStore: {
    questions: Question[]
  };

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/questions';
  }

  createQuestion(question: Question): Observable<Question> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem("accessToken")}`
    });
    let options = { headers: headers };
    return this.http.post<Question>(`${this.apiUrl}/create`, question, options);
  }

  getAllQuestions(paginationSettings: string): Observable<QuestionPaginatedDTO> {
    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}` + paginationSettings);
  }

  editQuestion(questionId: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${questionId}`, question);
  }

  deleteQuestion(id: number): Observable<string> {

    return this.http.delete<string>(`${this.apiUrl}/${id}`,httpOptionsTextResponse);

  }

  showQuestionPage(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  searchQuestionsByKeywords(searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {
    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/search/` + searchPattern + paginationSettings);
  }

  searchQuestionsByTags(searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {
    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/tagged/` + searchPattern + paginationSettings);
  }
}