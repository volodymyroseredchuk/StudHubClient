import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { TaskPaginatedDTO } from '../model/taskPaginatedDTO.model';
import { Task } from '../model/task.model';
import { Delete } from '../model/delete.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/tasks';
    }

    getAllTasks(paginationSettings: string): Observable<TaskPaginatedDTO> {
        return this.http.get<TaskPaginatedDTO>(`${this.apiUrl}` + paginationSettings);
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`)
    }

    createTask(task: Task): Observable<Task> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('refreshToken')}`
        });
        let options = { headers: headers };

        return this.http.post<Task>(`${this.apiUrl}/create`, task, options);
    }

    editTask(id: number, task: Task): Observable<Task> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('refreshToken')}`
        });
        let options = { headers: headers };

        return this.http.put<Task>(`${this.apiUrl}/${id}`, task, options);
    }

    deleteTask(id: number): Observable<Delete> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('refreshToken')}`
        });
        let options = { headers: headers };

        return this.http.delete<Delete>(`${this.apiUrl}/${id}`, options);
    }

    searchTasksByKeywords(searchPattern: string, paginationSettings: string): Observable<TaskPaginatedDTO> {
        return this.http.get<TaskPaginatedDTO>(`${this.apiUrl}/search/` + searchPattern + paginationSettings);
    }

    searchTasksByTags(searchPattern: string, paginationSettings: string): Observable<TaskPaginatedDTO> {
        return this.http.get<TaskPaginatedDTO>(`${this.apiUrl}/tagged/` + searchPattern + paginationSettings);
    }
}