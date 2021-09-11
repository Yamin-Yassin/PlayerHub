import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetails } from '@AppTypes/appTypes';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  private uid = '';
  private pushToken = '';

  constructor(private af: AngularFirestore) {}

  setUid(uid: string) {
    this.uid = uid;
  }

  getUID() {
    if (!this.uid) {
      return;
    }

    return this.uid;
  }

  setToken(token: string) {
    this.pushToken = token;
  }

  getToken() {
    if (!this.pushToken) {
      return;
    }

    return this.pushToken;
  }

  subscribeLogin(data: any) {
    const id = this.af.createId();
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

  getProfileData(uid: string) {
    return this.af
      .collection('Profile', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  getReviews(uid: string) {
    return this.af
      .collection('Reviews', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  getPosts(uid: string) {
    return this.af
      .collection('Posts', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  getGamePage(gameID: string) {
    return this.af
      .collection('Games', (ref) => ref.where('id-game', '==', gameID))
      .snapshotChanges();
  }

  getGames(idGames: string[]) {
    return this.af
      .collection('Games', (ref) => ref.where('id-game', 'in', idGames))
      .snapshotChanges();
  }

  getPostComments(id: string) {
    return this.af
      .collection('Posts')
      .doc(id)
      .collection('Comments')
      .snapshotChanges();
  }

  getReviewComments(id: string) {
    return this.af
      .collection('Reviews')
      .doc(id)
      .collection('Comments')
      .snapshotChanges();
  }

  postReview(review: any) {
    const id = this.af.createId();
    this.af.collection('Reviews').doc(id).set(review);
  }
}
