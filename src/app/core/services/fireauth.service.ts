import firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private fireService: FireService,
    public afAuth: AngularFireAuth
  ) { }
  
  doRegister(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email,
        value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }


  doLogin(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email,
        value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  
  doLogout() {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signOut()
        .then(() => {
          this.fireService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          console.log(error);
          reject();
        });
    })
  }
}
