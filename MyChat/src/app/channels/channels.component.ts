import { Component, OnDestroy, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { Subject, takeUntil } from 'rxjs';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { User } from '../models/user';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  channels: Array<Channel> = [];
  trash = faTrashAlt;
  sessionGroup: string;
  sessionUserRole: number;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService
  ) {}

  ngOnInit() {
    this.session.group$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newGroup) => {
        this.sessionGroup = newGroup;

        if (this.sessionGroup != undefined && this.sessionGroup != '') {
          this.getGroupChannels();
        } else {
          this.channels = [];
        }

        this.session.setChannel('');
      });

    this.session.role$.pipe(takeUntil(this.destroyed$)).subscribe((newRole) => {
      this.sessionUserRole = newRole;
    });

    this.refresh.channel$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.getGroupChannels();
    });
  }

  setChannel(channel: string) {
    this.session.setChannel(channel);
  }

  deleteChannel(channelId: string) {
    this.apiService.deleteChannel(channelId);
  }

  getGroupChannels(): void {
    if (this.sessionGroup == '' || this.sessionGroup == undefined) {
      this.channels = [];
      return;
    }

    this.apiService.getGroupChannels(this.sessionGroup).subscribe(
      (channels: Array<Channel>) => {
        this.channels = channels;
        console.log(this.channels);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createChannel(name: string): void {
    if (this.sessionGroup == '' || this.sessionGroup == undefined) return;

    this.apiService.createChannel(name, this.sessionGroup).subscribe(
      () => {
        let time = Date.now();
        this.refresh.refreshChannels(time);
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
