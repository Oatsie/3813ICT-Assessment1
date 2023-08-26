// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

// export class DataService {

//   private _storage: Storage | null = null;

//   constructor(private storage: Storage) {
//     this._storage = storage
//   }

//   // Creates or updates the list of all users
//   public setUsers(users : User[]){
//     this._storage?.setItem(this.BuildUserKey(), JSON.stringify(users))
//   }

//   // Returns a list of all users in the system
//   public getUsers() : User[] | undefined{
//     var users = this._storage?.getItem(this.BuildUserKey())
//     return users == undefined ? undefined : JSON.parse(users);
//   }

//   // Creates or updates the list of all groups
//   public setGroups(groups: Group[]){
//     this._storage?.setItem(this.BuildGroupKey(), JSON.stringify(groups))
//   }

//   // Returns a list of all groups in the system
//   public getGroups(): Group[] | undefined{
//     var groups = this._storage?.getItem(this.BuildGroupKey())
//     return groups == undefined ? undefined : JSON.parse(groups);
//   }

//   // Creates or updates the list of all roles
//   public setRoles(roles: Role[]){
//     this._storage?.setItem(this.BuildRoleKey(), JSON.stringify(roles))
//   }

//   // Returns a list of all roles in the system
//   public getRoles() : Role[] | undefined{
//     var roles = this._storage?.getItem(this.BuildRoleKey())
//     return roles == undefined ? undefined : JSON.parse(roles);
//   }

//   // Creates or updates the list of all channels
//   public setChannels(channels: Channel[]){
//     this._storage?.setItem(this.BuildChannelKey(), JSON.stringify(channels))
//   }

//   // Returns a list of all channeld in the system
//   public getChannels() : Channel[] | undefined{
//     var channels = this._storage?.getItem(this.BuildChannelKey())
//     return channels == undefined ? undefined : JSON.parse(channels);
//   }

//   private BuildUserKey() : string{
//     return `${User.name}s`;
//   }

//   private BuildGroupKey() : string{
//     return `${Group.name}s`;
//   }

//   private BuildChannelKey() : string{
//     return `${Channel.name}s`;
//   }

//   private BuildRoleKey() : string{
//     return `${Role.name}s`;
//   }
// }
