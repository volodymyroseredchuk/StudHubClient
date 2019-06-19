import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService{

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(protected http: HttpClient) {
        super(http);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/signin`, { username, password })
            .pipe(map(jwt => {
                // login successful if there's a jwt token in the response
                if (jwt) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('jwt-token', `${jwt.type} ${jwt.token}`);
                }

                return jwt;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('jwt-token');
    }
}