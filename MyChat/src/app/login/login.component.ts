import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../Services/API/api.service';
import { SessionService } from '../Services/Session/session.service';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  user: User;
  registerUser: boolean;
  registrationForm: FormGroup;
  loginFail: boolean;
  registerFail: boolean;

  constructor(
    private apiService: ApiService,
    private session: SessionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = {};
    this.createRegistrationForm();
    this.populateForm();
  }

  // Switches the register user to false
  ToggleLogin(): void {
    this.registerUser = false;
  }

  // Registers a new user if toggle is already true, otherwise toggles to true
  ToggleRegister(): void {
    if (!this.registerUser) {
      this.registerUser = true;
    } else {
      const user = {
        username: this.registrationForm?.get('username')?.value,
        password: this.registrationForm?.get('password')?.value,
        email: this.registrationForm?.get('email')?.value,
      };
      this.apiService
        .createUser(user.username, user.password, user.email, '', '')
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          if (res) {
            this.login();
          }
        });
    }
    this.registerFail = true;
  }

  // Uses the username and password to login
  login() {
    const user = {
      username: this.registrationForm?.get('username')?.value,
      password: this.registrationForm?.get('password')?.value,
    };

    this.apiService
      .login(user.username, user.password)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res) {
          this.session.setUser(res);
          this.router.navigate(['/home']);
        }
      });

    this.loginFail = true;
  }

  // Cretes a new form
  createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      username: new UntypedFormControl({
        value: null,
      }),
      password: new UntypedFormControl({
        value: null,
      }),
      email: new UntypedFormControl({
        value: null,
      }),
    });
  }

  // Populates the form
  populateForm(): void {
    this.registrationForm.patchValue({
      username: null,
    });
    this.registrationForm.patchValue({
      password: null,
    });
    this.registrationForm.patchValue({
      email: null,
    });
  }

  // Gets the username from the form
  get username() {
    return this.registrationForm?.get('username');
  }

  // Gets the password from the form
  get password() {
    return this.registrationForm?.get('password');
  }

  // Gets the email address from the form
  get email() {
    return this.registrationForm?.get('email');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
