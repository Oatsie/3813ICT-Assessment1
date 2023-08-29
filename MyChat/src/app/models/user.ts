export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  groups: string[];
  roles: string[];
  channels: string[];

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    groups: string[],
    roles: string[],
    channels: string[]
  ) {
    this._id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.groups = groups;
    this.channels = channels;
    this.roles = roles;
  }
}
