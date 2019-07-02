import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import {Teacher} from "../model/teacher.model";

@Injectable({
    providedIn: 'root'
  })
  export class TeacherService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/teachers';
      }

  newTeacher(teacher: Teacher): Observable<Teacher> {
        return this.http.post<Teacher>(`${this.apiUrl}/create`, teacher);
    }

  findAllTeacher(): Observable<Teacher[]> {
      return this.http.get<Teacher[]>(`${this.apiUrl}`);
    }

  updateOneTeacher(teacherId: number , teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${teacherId}/edit`, teacher);
    }

  deleteTeacher(teacherId: number): Observable <any> {
      return this.http.delete(`${this.apiUrl}/${teacherId}/delete`);
    }

  showTeacherPage(id: number): Observable <Teacher> {
      return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
    }

  }
