import { Component } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject } from 'rxjs';
import { SocketService } from '../Services/Socket/socket.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css'],
})
export class MessageCreateComponent {
  sessionChannel: string;
  sessionUser: User;
  messageText: string;
  destroyed$ = new Subject<boolean>();
  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.session.channel$.subscribe((newChannel) => {
      this.sessionChannel = newChannel;
    });

    this.session.user$.subscribe((newUser) => {
      this.sessionUser = newUser;
    });
  }

  // Creates a new message for the channel
  createMessage(): void {
    console.log(this.sessionUser);
    console.log(this.sessionChannel);
    if (
      this.sessionUser == undefined ||
      this.sessionChannel == undefined ||
      this.sessionChannel == ''
    ) {
      return;
    }

    let time = Date.now();
    this.apiService
      .createMessage(
        this.sessionUser?._id,
        this.sessionUser?.username,
        this.sessionChannel,
        this.messageText,
        time
      )
      .subscribe(
        () => {
          this.socketService.send('newMessage:' + this.sessionChannel);
        },
        (error) => {
          console.error(error);
        }
      );

    this.messageText = '';
  }
}
