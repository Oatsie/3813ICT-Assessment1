import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from '../Services/Refresh/refresh.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  groups: Array<Group> = [];
  trash = faTrashAlt;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private refresh: RefreshService
  ) {}

  ngOnInit() {
    this.getGroups();

    this.refresh.group$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.getGroups();
    });
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
      () => {
        let time = Date.now();
        this.refresh.refreshGroups(time);
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
