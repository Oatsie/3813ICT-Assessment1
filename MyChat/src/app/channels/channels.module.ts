import { NgModule } from '@angular/core';
import { ChannelsComponent } from './channels.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ChannelsComponent],
  imports: [HttpClientModule, CommonModule, FontAwesomeModule],
  exports: [ChannelsComponent],
})
export class ChannelsModule {}
