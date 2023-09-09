import { NgModule } from '@angular/core';
import { MessageViewComponent } from './message-view.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [MessageViewComponent],
  imports: [HttpClientModule, CommonModule, FontAwesomeModule],
  exports: [MessageViewComponent],
})
export class MessageViewModule {}
