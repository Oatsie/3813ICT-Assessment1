import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UsersComponent],
  imports: [HttpClientModule],
  exports: [UsersComponent],
})
export class UsersModule {}
