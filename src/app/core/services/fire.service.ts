import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { userDetails } from '@AppTypes/tasks';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  private snapshotChangesSubscription: any;

  constructor(private af: AngularFirestore) {}

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  createUsername(details: userDetails) {
    return this.af.collection('userDetails').add(details);
  }

  getUsernames() {
    return this.af.collectionGroup('userDetails').snapshotChanges();
  }

  getUser() {}
}
