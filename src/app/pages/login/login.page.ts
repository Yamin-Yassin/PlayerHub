/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Profile } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';
import { FireauthService } from '@fire/fireauth.service';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage = '';

  isLoading = true;
  authSubsription: Observable<any>;
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
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
    private authService: FireauthService,
    private fire: FireService,
    private formBuilder: FormBuilder,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.authService
      .getAuthState()
      .pipe(take(1))
      .subscribe((res) => {
        this.isLoading = false;

        if (res) {
          this.fire.setUid(res.uid);
          this.checkToken();
          this.getUser();
          this.router.navigate(['/tabs/home']);
        }
      });

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

  tryLogin(value: { email: string; password: string }) {
    this.isLoading = true;

    this.authService.doLogin(value).then(
      (res) => {
        this.isLoading = false;
        this.fire.setUid(res.user.uid);
        this.checkToken();
        this.getUser();
        this.router.navigate(['/tabs/home']);
      },
      (err) => {
        this.isLoading = false;

        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  checkToken() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    let oldToken: string;
    const newToken = this.fire.getToken(); // o token quando abrimos a app
    const oldtokenRef = this.fire.getFirebaseToken(); //o token na bd

    oldtokenRef.forEach((e) => {
      oldToken = e.data()['pushToken'];
      console.log('oldToken', oldToken);
    });

    if (oldToken !== newToken) {
      this.fire.updateFirebaseToken(newToken);
      console.log('tokenUpdated');
    }
  }

  getUser() {
    this.fire.getProfileData(this.fire.getUID()).subscribe((data) => {
      data.forEach((e) => {
        this.fire.setMyProfile({
          username: e.payload.doc.data()['username'],
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          avatar: e.payload.doc.data()['avatar'],
          uid: e.payload.doc.data()['uid'],
          games: e.payload.doc.data()['games'],
          posts: e.payload.doc.data()['posts'],
          reviews: e.payload.doc.data()['reviews'],
          friends: e.payload.doc.data()['friends'],
          achievements: e.payload.doc.data()['achievements'],
          email: e.payload.doc.data()['email'],
          pushToken: e.payload.doc.data['pushToken'],
        });
      });
    });
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
}
