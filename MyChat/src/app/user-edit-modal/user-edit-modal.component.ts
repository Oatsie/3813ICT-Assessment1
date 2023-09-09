import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from '../Services/API/api.service';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css'],
})
export class UserEditModalComponent {
  @Input() user: User;
  @Input() sessionGroup: string;
  role: string;
  removeGroup: Boolean;

  constructor(
    public modalRef: MdbModalRef<UserEditModalComponent>,
    private apiService: ApiService,
    private refresh: RefreshService
  ) {}

  close() {
    this.modalRef.close();
  }

  userRoleSelected() {
    this.role = 'User';
  }

  groupRoleSelected() {
    this.role = 'Group Admin';
  }

  superRoleSelected() {
    this.role = 'Super Admin';
  }

  yesSelected() {
    this.removeGroup = true;
  }

  noSelected() {
    this.removeGroup = false;
  }

  editUser() {
    if (this.removeGroup) {
      let roleIndex = this.user.roles?.findIndex(
        (x) => x.groupId == this.sessionGroup
      );
      let groupIndex = this.user.groups?.findIndex(
        (x) => x == this.sessionGroup
      );
      this.user.roles?.splice(roleIndex!);
      this.user.groups?.splice(groupIndex!);

      this.apiService.updateUser(this.user).subscribe(
        () => {
          let time = Date.now();
          this.refresh.refreshUsers(time);
        },
        (error) => {
          console.error(error);
        }
      );
      this.modalRef.close();
      return;
    }

    let index = this.user.roles?.findIndex(
      (x) => x.groupId == this.sessionGroup
    );

    this.user.roles!.at(index!)!.name = this.role;

    this.apiService.updateUser(this.user).subscribe(
      () => {
        let time = Date.now();
        this.refresh.refreshUsers(time);
      },
      (error) => {
        console.error(error);
      }
    );

    this.modalRef.close();
  }
}
