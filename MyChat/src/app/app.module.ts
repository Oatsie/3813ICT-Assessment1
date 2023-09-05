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

@NgModule({
  declarations: [AppComponent, MainComponent],
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
