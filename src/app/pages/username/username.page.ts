/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FireService } from '@fire/fire.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {
  validations_form: FormGroup;

  subscription: Subscription;
  errorMessage = '';
  data: any;
  //variaveis para validar username
  usernameList: any[] = [];
  isvalid = false;

  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username is too short' },
      { type: 'duplicate', message: 'Username already exists' },
    ],
  };

  constructor(
    private fire: FireService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.data = history.state.data;
    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
    });

    this.fire.getUsernames().forEach((userData) => {
      this.usernameList = [];
      userData.forEach((e) => {
        this.usernameList.push(e.data()['username']);
      });
    });
  }

  tryRegisterUsername(value) {
    console.log('tryRegisterUsername', JSON.stringify(value));

    this.isvalid = !this.usernameList.includes(
      this.validations_form.controls['username'].value
    );

    if (this.isvalid) {
      this.fire
        .createProfile(this.data.uid, this.data.email, value.username)
        .then(
          (res) => {
            this.errorMessage = '';
            this.router.navigate(['/login']);
          },
          (err) => {
            this.errorMessage = err.message;
          }
        );
    } else {
      this.errorMessage = 'Username Already Exists';
    }
  }
}
