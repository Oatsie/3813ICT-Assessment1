import { Observable } from "rxjs";
import { Channel } from "../entities/Channel";

export interface IChannelRepository{
    getAllChannels(): Observable<Channel[]>;
    getChannelById(id: number): Observable<Channel> | Observable<undefined>;
    createChannel(channel: Channel): Observable<Error> | Observable<boolean>;
    updateChannel(channel: Channel): Observable<boolean>;
    deleteChannel(id: number): Observable<boolean>;
}