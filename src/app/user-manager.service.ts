import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from './user-list/user-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  apiEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiEndpoint + '/users');
  }

  addUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiEndpoint + '/users', user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.apiEndpoint + '/users/' + id);
  }

  updateUser(id: string, user: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.apiEndpoint + '/users/' + id, user);
  }

}
