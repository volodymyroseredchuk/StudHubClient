import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('accessToken')) {
            
            return true;
        } else {
            this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}   