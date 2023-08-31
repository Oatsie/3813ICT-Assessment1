import { Component } from '@angular/core';
import { Group } from '../models/group';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent {
  groups: Array<Group> = [];
  trash = faTrashAlt;

  constructor(
    private apiService: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  setGroup(group: string) {
    this.session.setGroup(group);
    console.log('group comp set group: ' + group);
  }

  deleteGroup(groupId: string) {
    this.apiService.deleteGroup(groupId);
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

  createGroup(name: string): void {
    this.apiService.createGroup(name).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
