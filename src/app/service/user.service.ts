import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import {User} from '../model/user.model';
import {QuestionForListDTO} from '../model/questionForListDTO.model';

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  confirmAccount(token: string) {
    return this.http.post<any>(`${this.apiUrl}/confirm-account`, {token});
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, {email});
  }

  resetPassword(password: string, confirmPassword: string, token: string) {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, {password, confirmPassword, token});
  }

  getUser() {
    return this.http.get<User>(`${this.apiUrl}/profile/my`, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
  }

  updateUser(user: User) {
    return this.http.post<any>(`${this.apiUrl}/profile/update`, user, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
  }

  getAllQuestionsByUser() {
    return this.http.get<QuestionForListDTO[]>(`${this.apiUrl}/profile/questions`, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
  }
}

