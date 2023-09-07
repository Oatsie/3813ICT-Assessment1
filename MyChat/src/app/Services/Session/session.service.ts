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
  private currentRole = new BehaviorSubject<number>(0);
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
  role$ = this.currentRole.asObservable();

  setGroup(newGroup: string) {
    this.currentGroup.next(newGroup);
    let role =
      this.currentUser.value.roles?.find((x) => x.groupId == newGroup)?.name ??
      '';
    this.setRole(role);
  }

  setChannel(newChannel: string) {
    this.currentChannel.next(newChannel);
  }

  setUser(newUser: User) {
    this.currentUser.next(newUser);
  }

  setRole(newRole: string) {
    let role = 0;
    switch (newRole) {
      case 'User': {
        role = 1;
        break;
      }
      case 'Group Admin': {
        role = 2;
        break;
      }
      case 'Super Admin': {
        role = 3;
        break;
      }
      default: {
        role = 0;
        break;
      }
    }
    this.currentRole.next(role);
  }
}
