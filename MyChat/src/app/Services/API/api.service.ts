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

  /**USER REQUESTS */
  // Requests a list of users
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/api/users`);
  }
  // Requests a list of users for a group
  getGroupUsers(groupId: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(
      `${this.apiUrl}/api/groups/${groupId}/users`
    );
  }

  // Requests a user based off login details
  login(username: string, password: string): Observable<any> {
    var body = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.apiUrl}/api/users/login`, body);
  }

  // Sends a request to create a new user
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

  // Sends a request to update a user
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

  /**GROUP REQUESTS */
  // Requests a list of groups
  getGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(`${this.apiUrl}/api/groups/`);
  }

  // Sends a request to create a new group
  createGroup(name: string, creater: string): Observable<any> {
    var body = {
      name: name,
      creater: creater,
    };
    return this.http.post(`${this.apiUrl}/api/groups`, body);
  }

  // Sends a request to delete a group
  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/groups/${groupId}`);
  }
  /**CHANNEL REQUESTS */
  // Requests a list of channels for a group
  getGroupChannels(groupId: string): Observable<Array<Channel>> {
    return this.http.get<Array<Channel>>(
      `${this.apiUrl}/api/groups/${groupId}/channels`
    );
  }

  // Sends a request to create a new channel for a group
  createChannel(name: string, groupId: string): Observable<any> {
    var body = {
      name: name,
      groupId: groupId,
    };
    return this.http.post(`${this.apiUrl}/api/channels`, body);
  }

  // Sends a request to delete a group
  deleteChannel(channelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/channels/${channelId}`);
  }
  /**MESSAGE REQUESTS */
  // Requests a list of messages for a channel
  getChannelMessages(channelId: string): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(
      `${this.apiUrl}/api/channels/${channelId}/messages`
    );
  }

  // Sends a request to create a new message
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
}
