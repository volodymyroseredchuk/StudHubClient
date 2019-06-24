import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);

            if (err.status === 403) {
                // auto logout if 403 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 401) {

                if (localStorage.getItem('refreshToken')) {
                    console.log("refresh token");
                    this.authenticationService.refreshToken();
                } 
                    
                const errorMessage = err.error.message;
                return throwError(errorMessage);
            } else {

                const errorMessage = err.error.message;
                return throwError(errorMessage);
            }

        }))
    }
}