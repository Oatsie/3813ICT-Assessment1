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

  private currentGroup = new BehaviorSubject<string>(
    '64ef1e8581491d68469c8d9f'
  );
  private currentChannel = new BehaviorSubject<string>('');
  private currentUser = new BehaviorSubject<User | undefined>(
    new User('1', 'James', '1', '1', [], [])
  );
  private latestMessage = new BehaviorSubject<number>(0);

  group$ = this.currentGroup.asObservable();
  channel$ = this.currentChannel.asObservable();
  user$ = this.currentUser.asObservable();
  message$ = this.latestMessage.asObservable();

  setGroup(newGroup: string) {
    this.currentGroup.next(newGroup);
  }

  setChannel(newChannel: string) {
    this.currentChannel.next(newChannel);
  }

  setUser(newUser: User) {
    this.currentUser.next(newUser);
  }

  setMessage(newMessage: number) {
    this.latestMessage.next(newMessage);
  }
}
