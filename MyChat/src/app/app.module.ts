import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './Users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ChannelsModule } from './channels/channels.module';
import { MessageViewModule } from './message-view/message-view.module';
import { MessageCreateModule } from './message-create/message-create.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    GroupsModule,
    ChannelsModule,
    MessageViewModule,
    MessageCreateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
