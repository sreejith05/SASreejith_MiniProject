import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            // Check if the error status is 401 (Unauthorized) or 403 (Forbidden)
            if (error.status === 401 || error.status === 403) {
                // Perform any additional error handling or logout logic here
                // For example, you may want to automatically log the user out
                this.authenticationService.logout();
            }

            // Return an observable that emits the error message
            return throwError(() => {
                // Use the error message from the response body if available, otherwise use the status text
                const errorMessage = error.error.message || error.statusText;
                return errorMessage;
            });
        }));
    }
}
