import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> { // Response might not be User
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
