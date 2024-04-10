import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Check if the user is logged in
        const user = this.authenticationService.userValue;
        if (user) {
            return true;
        }

        // If the user is not logged in, redirect to the login page with the return URL
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
