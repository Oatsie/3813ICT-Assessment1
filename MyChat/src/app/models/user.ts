import { Role } from './role';

export interface User {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  groups?: string[];
  roles?: Role[];
}
