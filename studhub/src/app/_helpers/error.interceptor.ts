import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authenticationService: AuthenticationService, 
        private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);

            if (err.status === 403) {
                // auto logout if 403 response returned from api
                console.log("403");
                this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 401) {
                console.log("401");
                const errorMessage = err.error.message;

                if (localStorage.getItem('refreshToken')) {
                    console.log("refresh token");
                    this.authenticationService.refreshToken();
                    console.log(request.headers.getAll);
                    location.reload(true);
                }      
            } else {
                console.log("else");
                const errorMessage = err.error.message;
                return throwError(errorMessage);
            }

        }))
    }
}