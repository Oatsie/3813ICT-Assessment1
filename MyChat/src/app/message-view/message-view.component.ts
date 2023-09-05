import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { User } from '../models/user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})
export class MessageViewComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  messages: Array<Message> = [];
  sessionChannel: string = '';
  sessionUser: User | undefined = undefined;

  constructor(
    private apiService: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.channel$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newChannel) => {
        this.sessionChannel = newChannel;

        if (this.sessionChannel != undefined) {
          this.getChannelMessages();
        } else {
          this.messages = [];
        }
      });

    this.session.message$.subscribe(() => {
      this.getChannelMessages();
    });
  }

  getChannelMessages(): void {
    if (this.sessionChannel == undefined || this.sessionChannel == '') {
      this.messages = [];
      return;
    }

    this.apiService.getChannelMessages(this.sessionChannel).subscribe(
      (messages: Array<Message>) => {
        this.messages = messages.sort((a, b) => (a.time > b.time ? 1 : -1));

        console.log(messages);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
