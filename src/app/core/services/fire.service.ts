import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetails } from '@AppTypes/appTypes';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  constructor(private af: AngularFirestore) {}

  subscribeLogin(data: any) {
    console.log(data);
  }

  unsubscribeLogOut() {
    localStorage.removeItem('user');
  }

  createUsername(details: UserDetails) {
    return this.af.collection('userDetails').add(details);
  }

  getUsernames() {
    return this.af.collectionGroup('userDetails').snapshotChanges();
  }

  getProfileData() {}

  getReviews() {}

  getGamePage(gameID: string) {
    return this.af
      .collection('Games', (ref) => ref.where('id-game', '==', gameID))
      .snapshotChanges();
  }

  getUser() {}
}
