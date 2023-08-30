import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Channel } from 'src/app/models/channel';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  private currentGroup = new BehaviorSubject<Group | undefined>(
    new Group('64ef1e8581491d68469c8d9f', 'test', [], [])
  );
  private currentChannel = new BehaviorSubject<Channel | undefined>(undefined);
  private currentUser = new BehaviorSubject<User | undefined>(undefined);

  group$ = this.currentGroup.asObservable();
  channel$ = this.currentChannel.asObservable();
  user$ = this.currentUser.asObservable();

  updateGroup(newGroup: Group) {
    this.currentGroup.next(newGroup);
  }

  updateChannel(newChannel: Channel) {
    this.currentChannel.next(newChannel);
  }

  updateUser(newUser: User) {
    this.currentUser.next(newUser);
  }
}
