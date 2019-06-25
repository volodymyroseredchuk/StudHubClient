import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseService} from './base-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Feedback} from "../model/feedback.model";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/feedback';
    }

    createFeedback(feedback: Feedback): Observable<Feedback> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorisation': `${localStorage.getItem("accessToken")}`
        });
        let options = {headers: headers};
        return this.http.post<Feedback>(`${this.apiUrl}/feedback`, feedback, options);
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
}
