import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // Update the URL to your server's API endpoint
        const apiUrl = 'https://your-api-url';

        // Modify the logic to handle different API endpoints
        if (url.endsWith('/users/authenticate') && method === 'POST') {
            return this.authenticate(body);
        } else if (url.endsWith('/users') && method === 'GET') {
            return this.getUsers();
        } else {
            // pass through any requests not handled above
            return next.handle(request);
        }
    }

    private authenticate(credentials: any): Observable<HttpEvent<any>> {
        // Send authentication request to the server
        return this.http.post<any>('https://your-api-url/authenticate', credentials)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    private getUsers(): Observable<HttpEvent<any>> {
        // Fetch users from the server
        return this.http.get<any>('https://your-api-url/users')
            .pipe(
                catchError(error => throwError(error))
            );
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
