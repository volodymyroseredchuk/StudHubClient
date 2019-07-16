import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import {University} from '../model/university.model';
import {Observable} from 'rxjs';
import {Teacher} from '../model/teacher.model';

@Injectable({providedIn: 'root'})
export class UniversityService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/universities';
    }

    getAllUniversities(): Observable<University[]> {
        return this.http.get<University[]>(`${this.apiUrl}`);
    }


    newTeacher(university: University): Observable<University> {
        return this.http.post<University>(`${this.apiUrl}/create`, university);
    }

    findAllUniversity(): Observable<University[]> {
        return this.http.get<University[]>(`${this.apiUrl}`);
    }

    updateOneUniversity(universityid: number, university: University): Observable<University> {
        return this.http.put<University>(`${this.apiUrl}/${universityid}/edit`, university);
    }

    deleteUniversity(universityid: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${universityid}/delete`);
    }

    showUniversityPage(universityId: number): Observable<University> {
        console.log(universityId);
        return this.http.get<University>(`${this.apiUrl}/${universityId}`);
    }
}

