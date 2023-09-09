import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    LoginRoutingModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
