import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { User } from '../models/user';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { SocketService } from '../Services/Socket/socket.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})
export class MessageViewComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  messages: Array<Message> = [];
  sessionChannel: string;
  sessionUser: User;
  ioConnection: any;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private socketService: SocketService
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

    this.innitIoConection();
  }

  private innitIoConection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService
      .getMessage()
      .subscribe((message: string) => {
        if (message == 'newMessage:' + this.sessionChannel) {
          this.getChannelMessages();
        }
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

    document.querySelectorAll('.message-list')?.forEach((element) => {
      let messageId = element.getAttribute('id');
      let message = this.messages.find((x) => x.id == messageId);
      if (message?.userId == this.sessionUser._id) {
        element.classList.add('current-user');
      }
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
