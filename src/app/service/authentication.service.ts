import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { BaseService } from './base-service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(protected http: HttpClient,private router: Router) {
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
                    localStorage.setItem('accessToken', `${jwt.type} ${jwt.accessToken}`);
                    localStorage.setItem('refreshToken', `${jwt.type} ${jwt.refreshToken}`);
                }

                return jwt;
            }));
    }
  loginGoogle(userData) {
    return this.http.post<any>(`${this.apiUrl}/signinGoogle`, {
      authToken: userData.authToken,
      email: userData.email,
      firstName: userData.firstName,
      id: userData.id,
      idToken: userData.idToken,
      lastName: userData.lastName,
      name: userData.name,
      photoUrl: userData.photoUrl,
      provider: userData.provider
    })
      .pipe(map(jwt => {
        // login successful if there's a jwt token in the response
        if (jwt) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('accessToken', `${jwt.type} ${jwt.accessToken}`);
          localStorage.setItem('refreshToken', `${jwt.type} ${jwt.refreshToken}`);
        }

        return jwt;
      }));
  }

    refreshToken() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('refreshToken')}`
        });
        let options = { headers: headers };
        return this.http.post<any>(`${this.apiUrl}/token/refresh`, null, options).toPromise().then(data => {
            localStorage.setItem("accessToken", data.type + " " + data.accessToken);
            localStorage.setItem("accessToken", data.type + " " + data.refreshToken);
        });
    }

    verifyToken(token: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        });
        let options = { headers: headers };
        return this.http.post(`${this.apiUrl}/token/verify`, null, options);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        let url = location.href.replace(location.origin, "");
        
        if(location.href.substring(23,29) !== "signin"){
            window.location.href = "/signin?returnUrl=" + url;
        }
    }
}
