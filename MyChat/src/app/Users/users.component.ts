import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../Services/API/api.service';
import { User } from '../models/user';
import { SessionService } from '../Services/Session/session.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { SocketService } from '../Services/Socket/socket.service';

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
  superAdmin: boolean;
  destroyed$ = new Subject<boolean>();
  sessionUserRole: number;
  editUserModal: MdbModalRef<UserEditModalComponent>;
  ioConnection: any;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService,
    private router: Router,
    private modalService: MdbModalService,
    private socketService: SocketService
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

    this.session.role$.pipe(takeUntil(this.destroyed$)).subscribe((newRole) => {
      this.sessionUserRole = newRole;
    });

    this.superAdmin =
      this.sessionUser.roles?.find((x) => x.name == 'Super Admin') != null;

    this.innitIoConection();
  }

  private innitIoConection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService
      .getMessage()
      .subscribe((message: string) => {
        if (message == 'editUser:' + this.sessionGroup) {
          this.getGroupUsers();
        }
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

  editUser(user: User) {
    this.editUserModal = this.modalService.open(UserEditModalComponent, {
      data: {
        user: user,
        sessionGroup: this.sessionGroup,
      },
    });
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

  logout() {
    this.session.setChannel('');
    this.session.setGroup('');
    this.session.setUser({
      _id: '',
      username: '',
      password: '',
      email: '',
      groups: [],
      roles: [],
    });
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
