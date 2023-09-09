import { NgModule } from '@angular/core';
import { MessageCreateComponent } from './message-create.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MessageCreateComponent],
  imports: [HttpClientModule, CommonModule, FontAwesomeModule, FormsModule],
  exports: [MessageCreateComponent],
})
export class MessageCreateModule {}
