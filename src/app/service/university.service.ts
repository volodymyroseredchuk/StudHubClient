import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import {University} from '../model/university.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniversityService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/universities';
    }

    getAllUniversities(): Observable<University[]> {
        return this.http.get<University[]>(`${this.apiUrl}`);
    }

    findAllUniversity(): Observable<University[]> {
        return this.http.get<University[]>(`${this.apiUrl}`);
    }

    newUniversity(university: University): Observable<University> {
        console.log(university);
        return this.http.post<University>(`${this.apiUrl}/university`, university);
    }

    deleteUniversity(universityid: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${universityid}`,
            {
                headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
            });
    }

    showUniversityPage(universityId: number): Observable<University> {
        console.log(universityId);
        return this.http.get<University>(`${this.apiUrl}/${universityId}`);
    }
}

