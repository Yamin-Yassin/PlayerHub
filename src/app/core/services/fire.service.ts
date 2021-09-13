import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post, UserDetails } from '@AppTypes/appTypes';

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

  createID() {
    return this.af.createId();
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

  subscribeLogin(data: any) {}

  unsubscribeLogOut() {
    localStorage.removeItem('user');
  }

  createUsername(details: UserDetails) {
    this.createProfile(details);
    return this.af.collection('userDetails').add(details);
  }

  getUsernames() {
    return this.af.collectionGroup('userDetails').snapshotChanges();
  }

  createProfile(details: UserDetails) {
    const profileData = {
      username: details.username,
      name: details.username,
      description: '',
      avatar: '',
      uid: this.uid,
      games: [],
      posts: [],
      reviews: [],
      friends: [],
      achievements: 0,
    };

    this.af.collection('Profile').doc(this.uid).set(profileData);
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

  postPost(id: string, desc: string, filename: string) {
    //TODO No login ir buscar isto tudo e guardar em variáveis aqui no fireservice
    let profileData;

    const post: Post = {
      'post-id': id,
      avatar: '',
      date: Date.now().toString(),
      description: desc,
      uid: this.uid,
      likes: [],
      photo: filename,
      username: '',
    };
    return this.af.collection('Posts').doc(id).set(post);
  }

  updateProfilePost(id: string, oldPosts: string[]) {
    return this.af
      .collection('Posts')
      .doc('cMdaSCrlFicrZzO9qPmn')
      .update({ posts: [...oldPosts, id] });
  }
}
