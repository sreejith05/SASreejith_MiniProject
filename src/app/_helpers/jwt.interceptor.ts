import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user != null; // Check if user is logged in
        const isApiUrl = request.url.startsWith(environment.apiUrl); // Check if request is to the API url

        if (isLoggedIn && isApiUrl) {
            // Modify the request to include any authentication data needed for JSON-based authentication
            // For example, you might send an API key or other credentials in the request headers
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json', // Set content type to JSON
                    // Include any other headers or authentication data required by your server
                }
            });
        }

        return next.handle(request);
    }
}
