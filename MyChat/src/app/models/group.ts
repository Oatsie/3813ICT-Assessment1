export class Group {
  id: string;
  name: string;
  users: string[];
  channels: string[];

  constructor(id: string, name: string, users: string[], channels: string[]) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.channels = channels;
  }
}
