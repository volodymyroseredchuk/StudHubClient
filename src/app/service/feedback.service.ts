import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {BaseService} from './base-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Feedback} from '../model/feedback.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
    })
};

@Injectable({
    providedIn: 'root'
})
export class FeedbackService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/feedback';
    }

    createFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(`${this.apiUrl}`, feedback, httpOptions);
    }

    // createFeedbackByUniversityId(feedback: Feedback): Observable<Feedback> {
    //     return this.http.post<Feedback>(`${this.apiUrl}/universities/{universityId}/feedback`, feedback, httpOptions);
    // }
    createFeedbackByUniversityId(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(`${this.apiUrl}/feedback`, feedback, httpOptions);
    }

    // getAllFeedbackByTeacherId(teacherId: number, feedback: Feedback): Observable<Feedback[]> {
    //     return this.http.get<Feedback[]>(`${this.apiUrl}`);
    // }

    getAllFeedbacks(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(`${this.apiUrl}`);
    }

    editFeedback(feedbackId: number, feedback: Feedback): Observable<Feedback> {
        return this.http.put<Feedback>(`${this.apiUrl}/${feedbackId}/edit`, feedback);
    }

    deleteFeedback(feedbackId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${feedbackId}/delete`);
    }

    getAllFeedbacksByCurrentUser() {
        return this.http.get<Feedback[]>(`${this.apiUrl}/current`, {
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }

    getAllFeedbacksByTeacherId(feedbackId: number): Observable<any> {
        console.log(feedbackId);
        return this.http.get<Feedback[]>(`${this.apiUrl}/teacher/${feedbackId}`);
    }

    getAllFeedbacksByUniversityId(feedbackId: number): Observable<any> {
        console.log(feedbackId);
        return this.http.get<Feedback[]>(`${this.apiUrl}/university/${feedbackId}`);
    }

  getAllFeedbacksByUser(username: String) {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${username}`);
  }
}
