import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from '../Services/API/api.service';
import { SocketService } from '../Services/Socket/socket.service';

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
    private socketService: SocketService
  ) {}

  close() {
    this.modalRef.close();
  }

  // Sets role to User
  userRoleSelected() {
    this.role = 'User';
  }

  // Sets role to Group Admin
  groupRoleSelected() {
    this.role = 'Group Admin';
  }

  // Sets role to Super Admin
  superRoleSelected() {
    this.role = 'Super Admin';
  }

  // Sets user to be removed from group
  yesSelected() {
    this.removeGroup = true;
  }

  // Sets user to not be removed from Group
  noSelected() {
    this.removeGroup = false;
  }

  // Updates the user details
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
          this.socketService.send('editUser:' + this.sessionGroup);
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
        this.socketService.send('editUser:' + this.sessionGroup);
      },
      (error) => {
        console.error(error);
      }
    );

    this.modalRef.close();
  }
}
