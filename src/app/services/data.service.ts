import { Injectable } from '@angular/core';
import { UserDetails } from '@AppTypes/appTypes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user: UserDetails = {
    email: '',
    username: '',
  };

  private messageSource = new BehaviorSubject(this.user);

  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(msg: UserDetails) {
    this.messageSource.next(msg);
  }
}
