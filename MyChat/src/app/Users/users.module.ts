import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UsersComponent],
  imports: [HttpClientModule, CommonModule],
  exports: [UsersComponent],
})
export class UsersModule {}
