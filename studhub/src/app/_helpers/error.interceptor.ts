import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import {EMPTY} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private http: HttpClient,
        private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);

            if (err.status === 403) {
                // auto logout if 403 response returned from api
                this.authenticationService.logout();
                this.router.navigate(["/signin"]);
                location.reload(true);
            } else if (err.status === 401) {

                if (localStorage.getItem('refreshToken')) {
                   console.log("refresh");
                    this.authenticationService.verifyToken(localStorage.getItem("refreshToken")).toPromise()
                    .then(() => {
                        console.log(1);
                        return this.authenticationService.refreshToken();
                        }).then(() => {
                            console.log(2);
                            request.headers.set("Authorization", localStorage.getItem("accessToken"));
                        }).then(() => {
                            console.log(3);
                            return this.http.request(request).toPromise()
                            .then(() =>  {
                                console.log(4);
                                location.reload(true);
                                return EMPTY;
                            });
                        }).catch(error => {
                        console.log(error);
                        this.authenticationService.logout();
                        this.router.navigate(["/signin"]);
                        location.reload(true);
                    });
                    return EMPTY;
                } 
            } else {

                const errorMessage = err.error.message;
                return throwError(errorMessage);
            }

        }))
    }
}