import { Channel } from "./Channel";

export class User{
    id: number;
    username: string;
    password: string;
    channels: Channel[]

    constructor(id: number, username: string, password: string, channels: Channel[]){
        this.id = id;
        this.username = username;
        this.password = password;
        this.channels = channels;
    }
}