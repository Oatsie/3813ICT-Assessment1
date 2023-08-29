import { Component } from '@angular/core';
import { ApiService } from '../Services/API/api.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.apiService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createUser(
    username: string,
    password: string,
    email: string,
    groupId: string
  ): void {
    this.apiService.createUser(username, password, email, groupId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
