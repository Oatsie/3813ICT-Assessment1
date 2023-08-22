import { Injectable, Predicate } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel } from '../entities/Channel';
import { IChannelRepository } from './IChannelRepository';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelRepository implements IChannelRepository {
  
  constructor(private storage: DataService){  }

  getAllChannels(): Observable<Channel[]> {
    return of(this.channelQuery(x => x == x) ?? []);
  }

  getChannelById(id: number): Observable<Channel> | Observable<undefined>{
    var channel = this.channelQuery(x => x.id == id)
    return channel == undefined ? of(undefined) : of(channel[0]);
  }

  createChannel(channel: Channel): Observable<boolean> | Observable<Error>{
    var channels = this.storage.getChannels();
    
    if(channels == undefined)
      channels = []

    if(channels.some(c => c.name == channel.name))
      return of(Error("Channel name is already taken"))
    
    channels.push(channel);
    
    return this.saveChanges(channels);
  }

  updateChannel(channel: Channel): Observable<boolean> {
    var channels = this.storage.getChannels();

    if (channels == undefined)
      return of(false);

    var channelIndex = channels.findIndex((u) => u.id === channel.id);
    if (channelIndex == -1)
      return of(false)

    channels[channelIndex] = channel;
    
    return this.saveChanges(channels);
  }

  deleteChannel(id: number): Observable<boolean> {
    var channels = this.storage.getChannels();

   if (channels == undefined)
      return of(true);

    var channelIndex = channels.findIndex(x => x.id == id);
    if (channelIndex == -1)
      return of(true);
    
    channels.splice(channelIndex);

    return this.saveChanges(channels);
  }

  channelQuery(query: Predicate<Channel>) : Channel[] | undefined{
    var channels = this.storage.getChannels()

    return channels?.filter(query);
  }

  private saveChanges(channels: Channel[]): Observable<boolean>{
    try{
      this.storage.setChannels(channels);
    }catch{
      return of(false)
    }
    return of(true);
  }
}
