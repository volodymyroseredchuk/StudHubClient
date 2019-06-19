import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
     }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/signup`, user);
    }

    forgotPassword(email: string){
        return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
    }

    resetPassword(password: string, confirmPassword: string, token: string){
        return this.http.post<any>(`${this.apiUrl}/reset-password`, { password, confirmPassword, token });
    }
}       