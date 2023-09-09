import { Component, OnDestroy, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { Subject, takeUntil } from 'rxjs';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ChannelCreateModalComponent } from '../channel-create-modal/channel-create-modal.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  channels: Array<Channel> = [];
  sessionGroup: string;
  sessionUserRole: number;
  sessionChannel: string;
  createChannelModal: MdbModalRef<ChannelCreateModalComponent>;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService,
    private modalService: MdbModalService
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

    this.session.channel$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newChannel) => {
        this.sessionChannel = newChannel;
      });

    this.refresh.channel$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.getGroupChannels();
    });
  }

  setChannel(channel: string) {
    this.session.setChannel(channel);

    document.querySelectorAll('.channel-item')?.forEach((element) => {
      element.classList.remove('highlight');
    });
    document.getElementById(channel)?.classList.add('highlight');
  }

  deleteChannel() {
    this.apiService.deleteChannel(this.sessionChannel).subscribe(
      () => {
        let time = Date.now();
        this.refresh.refreshChannels(time);
      },
      (error) => {
        console.error(error);
      }
    );
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

  createChannel(): void {
    this.createChannelModal = this.modalService.open(
      ChannelCreateModalComponent
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
