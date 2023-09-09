import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  constructor() {}

  private messageUpdate = new BehaviorSubject<number>(1);

  message$ = this.messageUpdate.asObservable();

  refreshMessages(timeStamp: number) {
    this.messageUpdate.next(timeStamp);
  }

  private userUpdate = new BehaviorSubject<number>(1);

  user$ = this.userUpdate.asObservable();

  refreshUsers(timeStamp: number) {
    this.userUpdate.next(timeStamp);
  }

  private groupUpdate = new BehaviorSubject<number>(1);

  group$ = this.groupUpdate.asObservable();

  refreshGroups(timeStamp: number) {
    this.groupUpdate.next(timeStamp);
  }

  private channelUpdate = new BehaviorSubject<number>(1);

  channel$ = this.channelUpdate.asObservable();

  refreshChannels(timeStamp: number) {
    this.channelUpdate.next(timeStamp);
  }
}
