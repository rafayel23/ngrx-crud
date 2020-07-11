import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user-list/user-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  apiEndpoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiEndpoint + '/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiEndpoint + '/users', user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.apiEndpoint + '/users/' + id);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.apiEndpoint + '/users/' + id, user);
  }

}
