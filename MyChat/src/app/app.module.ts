import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './Users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ChannelsModule } from './channels/channels.module';
import { MessageViewModule } from './message-view/message-view.module';
import { MessageCreateModule } from './message-create/message-create.module';
import { LoginModule } from './login/login.module';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupCreateModalComponent } from './group-create-modal/group-create-modal.component';
import { ChannelCreateModalComponent } from './channel-create-modal/channel-create-modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GroupCreateModalComponent,
    ChannelCreateModalComponent,
    UserEditModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    UsersModule,
    GroupsModule,
    ChannelsModule,
    MessageViewModule,
    MessageCreateModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
