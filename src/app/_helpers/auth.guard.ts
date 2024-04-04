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
            // If the user is logged in, you may want to perform additional checks here,
            // such as verifying the validity of the authentication token.
            // For now, simply return true to allow access.
            return true;
        }

        // If the user is not logged in, redirect to the login page with the return URL
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
