import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [GroupsComponent],
  imports: [HttpClientModule, CommonModule, FontAwesomeModule],
  exports: [GroupsComponent],
})
export class GroupsModule {}
