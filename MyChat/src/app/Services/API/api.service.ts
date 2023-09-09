import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';

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

  getGroupChannels(groupId: string): Observable<Array<Channel>> {
    return this.http.get<Array<Channel>>(
      `${this.apiUrl}/api/groups/${groupId}/channels`
    );
  }

  getChannelMessages(channelId: string): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(
      `${this.apiUrl}/api/channels/${channelId}/messages`
    );
  }

  getGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(`${this.apiUrl}/api/groups/`);
  }

  createGroup(name: string, creater: string): Observable<any> {
    var body = {
      name: name,
      creater: creater,
    };
    return this.http.post(`${this.apiUrl}/api/groups`, body);
  }

  login(username: string, password: string): Observable<any> {
    var body = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.apiUrl}/api/users/login`, body);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/groups/${groupId}`);
  }

  createChannel(name: string, groupId: string): Observable<any> {
    var body = {
      name: name,
      groupId: groupId,
    };
    return this.http.post(`${this.apiUrl}/api/channels`, body);
  }

  deleteChannel(channelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/channels/${channelId}`);
  }

  createMessage(
    userId?: string,
    username?: string,
    channelId?: string,
    content?: string,
    time?: number
  ): Observable<any> {
    var body = {
      userId: userId,
      username: username,
      channelId: channelId,
      content: content,
      time: time,
    };
    return this.http.post(`${this.apiUrl}/api/messages`, body);
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

  updateUser(user: User): Observable<any> {
    var body = {
      id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      groups: user.groups,
      roles: user.roles,
    };
    return this.http.post(`${this.apiUrl}/api/users/update`, body);
  }
}
