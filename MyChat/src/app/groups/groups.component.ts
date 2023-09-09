import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject, takeUntil } from 'rxjs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GroupCreateModalComponent } from '../group-create-modal/group-create-modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  groups: Array<Group> = [];
  trash = faTrashAlt;
  sessionUserRole: number;
  sessionUser: User;
  superAdmin: boolean;
  sessionGroup: Group;
  groupCreater: boolean;
  createGroupModal: MdbModalRef<GroupCreateModalComponent>;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService,
    private modalService: MdbModalService
  ) {}

  ngOnInit() {
    this.getGroups();

    this.refresh.group$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.getGroups();
    });

    this.session.role$.pipe(takeUntil(this.destroyed$)).subscribe((newRole) => {
      this.sessionUserRole = newRole;
    });

    this.session.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.sessionUser = user;
    });

    this.superAdmin =
      this.sessionUser.roles?.find((x) => x.name == 'Super Admin') != null;
  }

  setGroup(group: string) {
    this.session.setGroup(group);
    document.querySelectorAll('.group-item')?.forEach((element) => {
      element.classList.remove('highlight');
    });
    document.getElementById(group)?.classList.add('highlight');

    let currentGroup = this.groups.find((x) => x._id == group);
    this.groupCreater = currentGroup?.creater == this.sessionUser;
  }

  deleteGroup(groupId: string) {
    this.apiService.deleteGroup(groupId).subscribe(
      () => {
        let time = Date.now();
        this.refresh.refreshGroups(time);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getGroups(): void {
    this.apiService.getGroups().subscribe(
      (groups: Array<Group>) => {
        this.groups = groups;
        console.log(this.groups);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createGroup(): void {
    this.createGroupModal = this.modalService.open(GroupCreateModalComponent);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
