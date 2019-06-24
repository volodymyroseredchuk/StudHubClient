import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../model/question.model';
import { QuestionPaginatedDTO } from '../model/questionPaginatedDTO.model';

const httpOptionsTextResponse = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwt-token'),
    
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
        this.dataStore = { questions: [] };
        this.subjectQuestions = <BehaviorSubject<Question[]>>new BehaviorSubject([]);
        this.questions = this.subjectQuestions.asObservable();
      }

    createQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(`${this.apiUrl}/create`, question);
    }

    getAllQuestions(paginationSettings: string): Observable<QuestionPaginatedDTO> {
      return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}` + paginationSettings);
    }

    editQuestion(questionId: number , question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${questionId}/edit`, question);
    }
    // alternative getAll method using BehavourSubject
    loadAll() {
        this.http.get<Question[]>(`${this.apiUrl}`).subscribe(data => {
        this.dataStore.questions = data;
        this.subjectQuestions.next(Object.assign({}, this.dataStore).questions);
      }, error => console.log('Could not load todos.'));
    }

    deleteQuestion(id: number): Observable <string>{
      return this.http.delete<string>(`${this.apiUrl}/${id}`);
      
    }
    //alternative delete method using BehavourSubject
    remove(questionId: number) {
        this.http.delete<string>(`${this.apiUrl}/${questionId}`, httpOptionsTextResponse).subscribe(response => {
        this.dataStore.questions.forEach((t, i) => {
          if (t.id === questionId) { this.dataStore.questions.splice(i, 1); }
        });  
        this.subjectQuestions.next(Object.assign({}, this.dataStore).questions);
      }, error => console.log('Could not delete todo.'));
    }

    showQuestionPage(id: number): Observable <Question>{
      return this.http.get<Question>(`${this.apiUrl}/${id}`);
    }

    searchQuestionsByKeywords(searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {
      return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/search/` + searchPattern + paginationSettings);
    }

    searchQuestionsByTags(searchPattern: string, paginationSettings: string): Observable<QuestionPaginatedDTO> {
      return this.http.get<QuestionPaginatedDTO>(`${this.apiUrl}/tagged/` + searchPattern + paginationSettings);
    }
  }