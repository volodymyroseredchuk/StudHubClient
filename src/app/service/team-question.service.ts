import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../model/question.model';
import { QuestionPaginatedDTO } from '../model/questionPaginatedDTO.model';
import { QuestionForListDTO } from "../model/questionForListDTO.model";
import { Delete } from '../model/delete.model';


@Injectable({
  providedIn: 'root'
})
export class TeamQuestionService extends BaseService {

  questions: Observable<Question[]>
  private subjectQuestions: BehaviorSubject<Question[]>;
  private dataStore: {
    questions: Question[]
  };

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/teams';
  }

  createQuestion(teamId: number, question: Question): Observable<Question> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.post<Question>(`${this.apiUrl}/${teamId}/questions/create`, question, options);
  }

  getAllQuestionsByTeamId(teamId: number, paginationSettings: string): Observable<QuestionPaginatedDTO> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/${teamId}/questions` + paginationSettings, options);
  }

  editQuestion(teamId: number, questionId: number, question: Question): Observable<Question> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.put<Question>(`${this.apiUrl}/${teamId}/questions/${questionId}`, question, options);
  }

  deleteQuestion(teamId: number, id: number): Observable<Delete> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.delete<Delete>(`${this.apiUrl}/${teamId}/questions/${id}`, options);
  }

  showQuestionPage(teamId: number, questionId: number): Observable<Question> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.get<Question>(`${this.apiUrl}/${teamId}/questions/${questionId}`, options);
  }

  searchQuestionsByKeywords(teamId: number, searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('refreshToken')}`
    });
    let options = { headers: headers };

    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/${teamId}/questions/search/` + searchPattern + paginationSettings, options);
  }

  searchQuestionsByTags(teamId: number, searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {
    return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/${teamId}/questions/tagged/` + searchPattern + paginationSettings);
  }
}
