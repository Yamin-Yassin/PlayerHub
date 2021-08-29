import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '@AppTypes/appTypes';
import { FireauthService } from '@fire/fireauth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';

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

  constructor(
    private dataService: DataService,
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
    this.authService.doRegister(value).then(
      (res) => {
        console.log('Register sucessfull');
        this.errorMessage = '';

        this.authService.doLogin(value).then(
          (res) => {
            console.log('login successful');
          },
          (err) => {
            console.log('login error');
            this.errorMessage = err.message;
          }
        );

        const user: UserDetails = {
          email: value.email,
          username: '',
        };

        this.dataService.changeMessage(user);
        this.router.navigate(['/username']);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
