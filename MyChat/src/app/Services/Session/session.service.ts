import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  private currentGroup = new BehaviorSubject<string>('');
  private currentChannel = new BehaviorSubject<string>('');
  private currentUser = new BehaviorSubject<User>({
    _id: '',
    username: '',
    password: '',
    email: '',
    groups: [],
    roles: [],
  });

  group$ = this.currentGroup.asObservable();
  channel$ = this.currentChannel.asObservable();
  user$ = this.currentUser.asObservable();

  setGroup(newGroup: string) {
    this.currentGroup.next(newGroup);
  }

  setChannel(newChannel: string) {
    this.currentChannel.next(newChannel);
  }

  setUser(newUser: User) {
    this.currentUser.next(newUser);
  }
}
