import { Component } from '@angular/core';
import { ApiService } from '../Services/API/api.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { SessionService } from '../Services/API/Session/session.service';
import { Group } from '../models/group';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: Array<User> = [];
  groupAdmins: Array<User> = [];
  superAdmins: Array<User> = [];
  sessionGroup: string = '';
  sessionUser: User | undefined = undefined;

  constructor(
    private apiService: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.group$.subscribe((newGroup) => {
      this.sessionGroup = newGroup;
      console.log('user comp subscription: ' + this.sessionGroup);

      if (this.sessionGroup != undefined) {
        this.getGroupUsers();
      } else {
        this.users = [];
      }
    });

    this.session.user$.subscribe((newUser) => {
      this.sessionUser = newUser;
    });
  }

  getGroupUsers(): void {
    this.apiService.getGroupUsers(this.sessionGroup).subscribe(
      (users: Array<User>) => {
        this.users = [];
        this.groupAdmins = [];
        this.superAdmins = [];

        users.forEach((user) => {
          if (
            user.roles.some(
              (x) => x.groupId == this.sessionGroup && x.name == 'Super Admin'
            )
          ) {
            this.superAdmins.push(user);
          }
          if (
            user.roles.some(
              (x) => x.groupId == this.sessionGroup && x.name == 'Group Admin'
            )
          ) {
            this.groupAdmins.push(user);
          }
          if (
            user.roles.some(
              (x) => x.groupId == this.sessionGroup && x.name == 'User'
            )
          ) {
            this.users.push(user);
          }
        });

        console.log(users);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createUser(
    username: string,
    password: string,
    email: string,
    groupId: string | undefined
  ): void {
    this.apiService
      .createUser(username, password, email, groupId ?? '', 'User')
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
