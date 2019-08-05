import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
        return this.http.delete(`${this.apiUrl}/${universityid}/delete`);
    }

    showUniversityPage(universityId: number): Observable<University> {
        console.log(universityId);
        return this.http.get<University>(`${this.apiUrl}/${universityId}`);
    }
}


// findAllTeacherOrderByMarkDesc(): Observable<TeacherDTO[]> {
//     return this.http.get<TeacherDTO[]>(`${this.apiUrl}`);
// }
//
// updateTeacher(teacherId: number) {
//     return this.http.post<Teacher>(`${this.apiUrl}/${teacherId}/update`, this.teacher, {
//         headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
//     });
// }
//
//
// deleteTeacher(teacherId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${teacherId}/delete`);
// }
//
// showTeacherPage(teacherId: number): Observable<Teacher> {
//     console.log(teacherId);
// return this.http.get<Teacher>(`${this.apiUrl}/${teacherId}`);
// }
//
// getCurrentTeacher(teacher: Teacher) {
//     console.log(this.teacherId);
//     return this.http.get<Teacher>(`${this.apiUrl}/update/` + this.teacherId, {
//         // headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
//     });
// }
//
// getTeacher() {
//     this.teacherId = +this.route.snapshot.params.id;
//     // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
//     console.log(this.teacherId);
//     return this.http.get<Teacher>(`${this.apiUrl}/update/` + this.teacherId, {
//         // headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
//     });
// }
