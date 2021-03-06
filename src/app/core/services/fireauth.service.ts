import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  constructor(public afAuth: AngularFireAuth) {}

  doRegister(value: { email: string; password: string }) {
    return this.afAuth.createUserWithEmailAndPassword(
      value.email,
      value.password
    );
  }

  doLogin(value: { email: string; password: string }) {
    return this.afAuth.signInWithEmailAndPassword(value.email, value.password);
  }

  doLogout() {
    return this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
