import { Channel } from "./Channel";
import { User } from "./User";

export class Group{
    id: number;
    name: string;
    users: User[];
    channels: Channel[]

    constructor(id: number, name: string, users: User[], channels: Channel[]){
        this.id = id;
        this.name = name;
        this.users = users;
        this.channels = channels;
    }
}