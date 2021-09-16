/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from '@fire/fireauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
    ],
  };

  errorMessage = '';

  constructor(
    private authService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  tryRegister(value: { email: string; password: string }) {
    console.log('try');
    this.authService.doRegister(value).then(
      (res) => {
        this.errorMessage = '';
        console.log('Register sucessfull', JSON.stringify(res));

        this.authService.doLogin(value).then(
          (success) => {
            console.log('login successful', JSON.stringify(success));
          },
          (err) => {
            console.log('login error', JSON.stringify(err));
            this.errorMessage = err.message;
          }
        );

        this.router.navigate(['/username'], {
          state: {
            data: {
              email: value.email,
              uid: res.user.uid,
            },
          },
        });
      },
      (err) => (this.errorMessage = err.message)
    );
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
