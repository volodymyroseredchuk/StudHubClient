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

    updateTeacher(teacherId: number) {
        return this.http.post<Teacher>(`${this.apiUrl}/${teacherId}/update`, this.teacher, {
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }


    deleteTeacher(teacherId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${teacherId}/delete`);
    }

    showTeacherPage(teacherId: number): Observable<Teacher> {
        console.log(teacherId);
        return this.http.get<Teacher>(`${this.apiUrl}/${teacherId}`);
    }

    getCurrentTeacher(teacher: Teacher) {
        console.log(this.teacherId);
        return this.http.get<Teacher>(`${this.apiUrl}/update/` + this.teacherId, {
            // headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }

    getTeacher() {
        this.teacherId = +this.route.snapshot.params.id;
        // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
        console.log(this.teacherId);
        return this.http.get<Teacher>(`${this.apiUrl}/update/` + this.teacherId, {
            // headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
        });
    }

}
