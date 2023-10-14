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
import { SocketService } from '../Services/Socket/socket.service';

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
  ioConnection: any;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService,
    private modalService: MdbModalService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.getGroups();

    this.session.role$.pipe(takeUntil(this.destroyed$)).subscribe((newRole) => {
      this.sessionUserRole = newRole;
    });

    this.session.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.sessionUser = user;
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
        if (message == 'newGroup' || message == 'deleteGroup') {
          this.getGroups();
        }
      });
  }

  setGroup(group: string) {
    this.session.setGroup(group);
    document.querySelectorAll('.group-item')?.forEach((element) => {
      element.classList.remove('highlight');
    });
    document.getElementById(group)?.classList.add('highlight');

    this.sessionGroup = this.groups.find((x) => x._id == group)!;
    this.groupCreater = this.sessionGroup?.creater == this.sessionUser._id;
  }

  deleteGroup() {
    this.apiService.deleteGroup(this.sessionGroup._id).subscribe(
      () => {
        this.socketService.send('deleteGroup');
        this.session.setGroup('');
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
