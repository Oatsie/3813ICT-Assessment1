import { Injectable, Predicate } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../entities/Group';
import { IGroupRepository } from './IGroupRepository';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class GroupRepository implements IGroupRepository {
  
  constructor(private storage: DataService){  }

  getAllGroups(): Observable<Group[]> {
    return of(this.groupQuery(x => x == x) ?? []);
  }

  getGroupById(id: number): Observable<Group> | Observable<undefined>{
    var group = this.groupQuery(x => x.id == id)
    return group == undefined ? of(undefined) : of(group[0]);
  }

  createGroup(group: Group): Observable<boolean> | Observable<Error>{
    var groups = this.storage.getGroups();
    
    if(groups == undefined)
      groups = []

    if(groups.some(g => g.name == group.name))
      return of(Error("Group name is already taken"))
    
    groups.push(group);
    
    return this.saveChanges(groups);
  }

  updateGroup(group: Group): Observable<boolean> {
    var groups = this.storage.getGroups();

    if (groups == undefined)
      return of(false);

    var groupIndex = groups.findIndex(g => g.id === group.id);
    if (groupIndex == -1)
      return of(false)

    groups[groupIndex] = group;
    
    return this.saveChanges(groups);
  }

  deleteGroup(id: number): Observable<boolean> {
    var groups = this.storage.getGroups();

   if (groups == undefined)
      return of(true);

    var groupIndex = groups.findIndex(x => x.id == id);
    if (groupIndex == -1)
      return of(true);
    
    groups.splice(groupIndex);

    return this.saveChanges(groups);
  }

  groupQuery(query: Predicate<Group>) : Group[] | undefined{
    var groups = this.storage.getGroups()

    return groups?.filter(query);
  }

  private saveChanges(groups: Group[]): Observable<boolean>{
    try{
      this.storage.setGroups(groups);
    }catch{
      return of(false)
    }
    return of(true);
  }
}
