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
  sessionGroup: Group | undefined = undefined;
  sessionUser: User | undefined = undefined;

  constructor(
    private apiService: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.group$.subscribe((newGroup) => {
      this.sessionGroup = newGroup;

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
    this.apiService.getGroupUsers(this.sessionGroup!.id).subscribe(
      (users: Array<User>) => {
        this.users = users;
        console.log(this.users);
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
      .createUser(username, password, email, groupId ?? '')
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
