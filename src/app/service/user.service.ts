import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import {User} from '../model/user.model';
import { Observable } from 'rxjs';
import { FreelancerDTO } from '../model/freelancerDTO.model';

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/profile`);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  receiveConfirmLink(user: User) {
    return this.http.post(`${this.apiUrl}/signup/confirm`, user);
  }

  confirmAccount(token: string) {
    return this.http.post<any>(`${this.apiUrl}/confirm-account`, {token});
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, {email});
  }

  receiveForgotPasswordLink(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password/confirm`, {email});
  }

  rateFreelancer(freelancerDTO: FreelancerDTO): Observable<FreelancerDTO> {
    return this.http.post<FreelancerDTO>(`${this.apiUrl}/rating/freelancer`, freelancerDTO, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('accessToken'))
    });
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
}

