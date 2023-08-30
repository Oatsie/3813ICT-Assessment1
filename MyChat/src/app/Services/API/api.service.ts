import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/api/users`);
  }

  getGroupUsers(groupId: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(
      `${this.apiUrl}/api/groups/${groupId}/users`
    );
  }

  getGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(`${this.apiUrl}/api/groups/`);
  }

  createGroup(name: string): Observable<any> {
    var body = {
      name: name,
    };
    return this.http.post(`${this.apiUrl}/api/groups`, body);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/groups/${groupId}`);
  }

  createUser(
    username: string,
    password: string,
    email: string,
    groupId: string,
    role: string
  ): Observable<any> {
    var body = {
      username: username,
      password: password,
      email: email,
      groupId: groupId,
      role: role,
    };
    return this.http.post(`${this.apiUrl}/api/users`, body);
  }
}
