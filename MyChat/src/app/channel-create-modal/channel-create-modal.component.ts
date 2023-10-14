import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from '../Services/API/api.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from '../Services/Session/session.service';
import { SocketService } from '../Services/Socket/socket.service';

@Component({
  selector: 'app-channel-create-modal',
  templateUrl: './channel-create-modal.component.html',
  styleUrls: ['./channel-create-modal.component.css'],
})
export class ChannelCreateModalComponent implements OnInit, OnDestroy {
  sessionGroup: string;
  destroyed$ = new Subject<boolean>();
  constructor(
    public modalRef: MdbModalRef<ChannelCreateModalComponent>,
    private apiService: ApiService,
    private refresh: RefreshService,
    private session: SessionService,
    private socketServive: SocketService
  ) {}
  ngOnInit() {
    this.session.group$.pipe(takeUntil(this.destroyed$)).subscribe((group) => {
      this.sessionGroup = group;
    });
  }
  close() {
    this.modalRef.close();
  }

  createChannel(): void {
    const channelName = document.getElementById(
      'channelNameInput'
    ) as HTMLInputElement;

    this.apiService
      .createChannel(channelName.value, this.sessionGroup)
      .subscribe(
        () => {
          this.socketServive.send('newChannel:' + this.sessionGroup);
          this.modalRef.close();
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
