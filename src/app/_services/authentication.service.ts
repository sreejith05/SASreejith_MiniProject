import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            // User found, return the user object
            const user = users[0];
            // Store user details in local storage
            localStorage.setItem('user', JSON.stringify(user));
            // Update the user subject
            this.userSubject.next(user);
            return user;
          } else {
            // User not found, return null
            return null ;
          }
        })
      );
  }
      logout(): void {
        // Remove user details from local storage
        localStorage.removeItem('user');
        // Clear the user subject
        this.userSubject.next(null);
        // Redirect to the login page
        this.router.navigate(['/login']);
    }}