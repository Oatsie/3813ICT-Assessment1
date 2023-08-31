import { Component } from '@angular/core';
import { Channel } from '../models/channel';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
})
export class ChannelsComponent {
  channels: Array<Channel> = [];
  trash = faTrashAlt;
  sessionGroup: string = '';

  constructor(
    private apiService: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.group$.subscribe((newGroup) => {
      this.sessionGroup = newGroup;

      if (this.sessionGroup != undefined && this.sessionGroup != '') {
        this.getGroupChannels();
      } else {
        this.channels = [];
      }

      this.session.setChannel('');
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
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
