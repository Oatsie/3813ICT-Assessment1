import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }

  createUser(
    username: string,
    password: string,
    email: string,
    groupId: string
  ): Observable<any> {
    var body = {
      username: username,
      password: password,
      email: email,
      groupId: groupId,
    };
    return this.http.post(`${this.apiUrl}/api/users`, body);
  }
}
