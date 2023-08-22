import { Injectable, Predicate } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../entities/Role';
import { IRoleRepository } from './IRoleRepository';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class RoleRepository implements IRoleRepository {
  
  constructor(private storage: DataService){  }

  getAllRoles(): Observable<Role[]> {
    return of(this.roleQuery(x => x == x) ?? []);
  }

  getRoleById(id: number): Observable<Role> | Observable<undefined>{
    var role = this.roleQuery(x => x.id == id)
    return role == undefined ? of(undefined) : of(role[0]);
  }

  createRole(role: Role): Observable<boolean> | Observable<Error>{
    var roles = this.storage.getRoles();
    
    if(roles == undefined)
      roles = []

    if(roles.some(r => r.name == role.name))
      return of(Error("Role name is already taken"))
    
    roles.push(role);
    
    return this.saveChanges(roles);
  }

  updateRole(role: Role): Observable<boolean> {
    var roles = this.storage.getRoles();

    if (roles == undefined)
      return of(false);

    var roleIndex = roles.findIndex((u) => u.id === role.id);
    if (roleIndex == -1)
      return of(false)

    roles[roleIndex] = role;
    
    return this.saveChanges(roles);
  }

  deleteRole(id: number): Observable<boolean> {
    var roles = this.storage.getRoles();

   if (roles == undefined)
      return of(true);

    var roleIndex = roles.findIndex(x => x.id == id);
    if (roleIndex == -1)
      return of(true);
    
    roles.splice(roleIndex);

    return this.saveChanges(roles);
  }

  roleQuery(query: Predicate<Role>) : Role[] | undefined{
    var roles = this.storage.getRoles()

    return roles?.filter(query);
  }

  private saveChanges(roles: Role[]): Observable<boolean>{
    try{
      this.storage.setRoles(roles);
    }catch{
      return of(false)
    }
    return of(true);
  }
}
