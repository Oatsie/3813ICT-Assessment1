import { Injectable, Predicate } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../entities/User';
import { IUserRepository } from './IUserRepository';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements IUserRepository {
  
  constructor(private storage: DataService){  }
  
  getUserByLogin(username: string, password: string): Observable<User> | Observable<undefined> {
    var user = this.userQuery(x => x.username == username && x.password == password)
    return user == undefined ? of(undefined) : of(user[0]);
  }

  getAllUsers(): Observable<User[]> {
    return of(this.userQuery(x => x == x) ?? []);
  }

  getUserById(id: number): Observable<User> | Observable<undefined>{
    var user = this.userQuery(x => x.id == id)
    return user == undefined ? of(undefined) : of(user[0]);
  }

  createUser(user: User): Observable<Error> | Observable<boolean> {
    var users = this.storage.getUsers();
    
    if(users == undefined)
      users = []
    
    if(users.some(u => u.username == user.username))
      return of(Error("Username already taken"))

    users.push(user);
    
    return this.saveChanges(users);
  }

  updateUser(user: User): Observable<boolean> {
    var users = this.storage.getUsers();

    if (users == undefined)
      return of(false);

    var userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex == -1)
      return of(false)

    users[userIndex] = user;
    
    return this.saveChanges(users);
  }

  deleteUser(id: number): Observable<boolean> {
    var users = this.storage.getUsers();

   if (users == undefined)
      return of(true);

    var userIndex = users.findIndex(x => x.id == id);
    if (userIndex == -1)
      return of(true);
    
    users.splice(userIndex);

    return this.saveChanges(users);
  }

  userQuery(query: Predicate<User>) : User[] | undefined{
    var users = this.storage.getUsers()

    return users?.filter(query);
  }

  private saveChanges(users: User[]): Observable<boolean>{
    try{
      this.storage.setUsers(users);
    }catch{
      return of(false)
    }
    return of(true);
  }
}
