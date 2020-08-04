import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  apiEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiEndpoint + '/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiEndpoint + '/users', user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.apiEndpoint + '/users/' + id);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.apiEndpoint + '/users/' + id, user);
  }

}
