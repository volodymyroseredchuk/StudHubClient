import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  confirmAccount(token: string) {
    return this.http.post<any>(`${this.apiUrl}/confirm-account`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(password: string, confirmPassword: string, token: string) {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { password, confirmPassword, token });
  }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/profile/my`, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
  }

  getForeignUser(username: String) {
    if (localStorage.getItem('accessToken') != null) {
      return this.http.get<any>(`${this.apiUrl}/profile/foreign/${username}`, {
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
      });
    }
    return this.http.get<any>(`${this.apiUrl}/profile/foreign/${username}`);
  }

  updateUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/profile/update`, user, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
  }
}

