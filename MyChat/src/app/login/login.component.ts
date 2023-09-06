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
  fail: boolean;

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

  ToggleLogin(): void {
    this.registerUser = false;
  }
  ToggleRegister(): void {
    if (!this.registerUser) {
      this.registerUser = true;
    } else {
      const user = {
        username: this.registrationForm?.get('username')?.value,
        password: this.registrationForm?.get('password')?.value,
        email: this.registrationForm?.get('email')?.value,
      };
      this.apiService.createUser(
        user.username,
        user.password,
        user.email,
        '',
        ''
      );
    }
  }

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

    this.fail = true;
  }
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

  get username() {
    return this.registrationForm?.get('username');
  }

  get password() {
    return this.registrationForm?.get('password');
  }

  get email() {
    return this.registrationForm?.get('email');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
