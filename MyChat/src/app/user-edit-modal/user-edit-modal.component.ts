import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css'],
})
export class UserEditModalComponent {
  @Input() user: User;
}
