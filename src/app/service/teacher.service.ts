import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseService} from './base-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Teacher} from '../model/teacher.model';
import {TeacherPaginatedDTO} from '../model/teacherPaginatedDTO.model';
import {TeacherDTO} from '../model/teacherForListDTO.model';
import {User} from '../model/user.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TeacherService extends BaseService {
    teacher: Teacher;
    teacherId: number;

    constructor(protected http: HttpClient, private route: ActivatedRoute, private teacherService: TeacherService) {
        super(http);
        this.apiUrl += '/teachers';
    }

    getAllTeachers(paginationSettings: string): Observable<TeacherPaginatedDTO> {
        return this.http.get<TeacherPaginatedDTO>(`${this.apiUrl}` + paginationSettings);
    }

    newTeacher(teacher: Teacher): Observable<Teacher> {
        console.log(teacher);
        return this.http.post<Teacher>(`${this.apiUrl}/teacher`, teacher);
    }

    searchTeachersByLastName(searchPattern: string, paginationSettings: string): Observable<TeacherPaginatedDTO> {
        return this.http.get<TeacherPaginatedDTO>(`${this.apiUrl}/teachersByLastName/` + searchPattern + paginationSettings);
    }

    findAllTeacherOrderByMarkDesc(): Observable<TeacherDTO[]> {
        return this.http.get<TeacherDTO[]>(`${this.apiUrl}`);
    }

    updateTeacher(teacher: Teacher) {
        return this.http.post<Teacher>(`${this.apiUrl}/update`, teacher, {
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }


    deleteTeacher(teacherId: number): Observable<{}> {
        return this.http.delete(`${this.apiUrl}/delete/${teacherId}`,
        {
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }

    showTeacherPage(teacherId: number): Observable<Teacher> {
        console.log(teacherId);
        return this.http.get<Teacher>(`${this.apiUrl}/${teacherId}`);
    }

    getTeacher(id: number) {
        return this.http.get<Teacher>(`${this.apiUrl}/${id}`, {
        });
    }

}
