import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [GroupsComponent],
  imports: [HttpClientModule, CommonModule],
  exports: [GroupsComponent],
})
export class GroupsModule {}
