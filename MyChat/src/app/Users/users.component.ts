import { Component } from '@angular/core';
import { ApiService } from '../Services/API/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private apiService: ApiService) {}

  getAllUsers(): void {
    this.apiService.getSomeData().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
