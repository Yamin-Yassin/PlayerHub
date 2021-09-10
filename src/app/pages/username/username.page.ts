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
import { DataService } from '@services/data.service';
import { UserDetails } from '@AppTypes/appTypes';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit, OnDestroy {
  validations_form: FormGroup;

  message: UserDetails;
  subscription: Subscription;
  errorMessage = '';

  //variaveis para validar username
  usernameList: any[];
  isvalid: boolean;

  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username is too short' },
      { type: 'duplicate', message: 'Username already exists' },
    ],
  };

  constructor(
    private data: DataService,
    private fire: FireService,

    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.fire.getUsernames().subscribe((data) => {
      this.usernameList = data.map((e) => e.payload.doc.data()['username']);
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
    });

    this.subscription = this.data.currentMessage.subscribe((msg) => {
      //CHANGE THIS TO USE ROUTER TO GET DATA
      this.message = msg;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  tryRegisterUsername(value) {
    console.log('tryRegisterUsername', value);

    const t: UserDetails = {
      email: this.message.email,
      username: value.username,
      uid: this.fire.getUID(),
      pushToken: this.fire.getToken(),
    };

    this.isvalid = !this.usernameList.includes(
      this.validations_form.controls['username'].value
    );

    if (this.isvalid) {
      this.fire.createUsername(t).then(
        (res) => {
          this.errorMessage = '';
          this.router.navigate(['tabs/home']);
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
