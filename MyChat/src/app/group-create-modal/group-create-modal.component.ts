import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from '../Services/API/api.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { SessionService } from '../Services/Session/session.service';
import { User } from '../models/user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-group-create-modal',
  templateUrl: './group-create-modal.component.html',
  styleUrls: ['./group-create-modal.component.css'],
})
export class GroupCreateModalComponent implements OnInit, OnDestroy {
  sessionUser: User;
  destroyed$ = new Subject<boolean>();
  constructor(
    public modalRef: MdbModalRef<GroupCreateModalComponent>,
    private apiService: ApiService,
    private refresh: RefreshService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.sessionUser = user;
    });
  }
  close() {
    this.modalRef.close();
  }

  createGroup(): void {
    const groupname = document.getElementById(
      'groupNameInput'
    ) as HTMLInputElement;

    this.apiService
      .createGroup(groupname.value, this.sessionUser._id!)
      .subscribe(
        (res) => {
          console.log(res);
          let user = this.sessionUser;
          user.groups?.push(res);
          user.roles?.push({ groupId: res, name: 'Group Admin' });

          this.apiService.updateUser(user).subscribe(
            () => {},
            (error) => {
              console.error(error);
            }
          );

          let time = Date.now();
          this.refresh.refreshGroups(time);
          this.modalRef.close();
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
