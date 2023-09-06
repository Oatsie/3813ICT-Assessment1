import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../Services/API/api.service';
import { User } from '../models/user';
import { SessionService } from '../Services/Session/session.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  groupAdmins: Array<User> = [];
  superAdmins: Array<User> = [];
  sessionGroup: string;
  sessionUser: User;
  destroyed$ = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService
  ) {}

  ngOnInit() {
    this.session.group$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newGroup) => {
        this.sessionGroup = newGroup;

        if (this.sessionGroup != undefined) {
          this.getGroupUsers();
        } else {
          this.users = [];
        }
      });

    this.refresh.user$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.getGroupUsers();
    });

    this.session.user$.subscribe((newUser) => {
      this.sessionUser = newUser;
    });
  }

  getGroupUsers(): void {
    if (this.sessionGroup == '' || this.sessionGroup == undefined) {
      this.users = [];
      return;
    }

    this.apiService.getGroupUsers(this.sessionGroup).subscribe(
      (users: Array<User>) => {
        this.users = [];
        this.groupAdmins = [];
        this.superAdmins = [];

        users.forEach((user) => {
          if (
            user?.roles?.some(
              (x) => x.groupId == this.sessionGroup && x.name == 'Super Admin'
            )
          ) {
            this.superAdmins.push(user);
          }
          if (
            user?.roles?.some(
              (x) => x.groupId == this.sessionGroup && x.name == 'Group Admin'
            )
          ) {
            this.groupAdmins.push(user);
          }
          if (
            user?.roles?.some(
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
        () => {
          let time = Date.now();
          this.refresh.refreshUsers(time);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
