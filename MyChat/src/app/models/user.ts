import { Role } from './role';

export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  groups: string[];
  roles: Role[];

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    groups: string[],
    roles: Role[]
  ) {
    this._id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.groups = groups;
    this.roles = roles;
  }
}
