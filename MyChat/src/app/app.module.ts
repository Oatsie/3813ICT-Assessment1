import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './Users/users.module';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { MessageCreateComponent } from './message-create/message-create.component';

@NgModule({
  declarations: [AppComponent, GroupsComponent, ChannelsComponent, MessageViewComponent, MessageCreateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
