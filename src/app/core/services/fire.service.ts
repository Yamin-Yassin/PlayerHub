/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment, Post, Profile, Review } from '@AppTypes/appTypes';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  myProfile: Profile = {
    username: '',
    name: '',
    description: '',
    avatar: '',
    uid: '',
    games: [],
    posts: [],
    reviews: [],
    friends: [],
    achievements: 0,
    email: '',
    pushToken: '',
  };

  constructor(private af: AngularFirestore, private toast: ToastController) {}

  setUid(uid: string) {
    this.myProfile.uid = uid;
    console.log(JSON.stringify(this.myProfile));
  }

  createID() {
    return this.af.createId();
  }

  getUID() {
    if (!this.myProfile.uid) {
      return;
    }
    return this.myProfile.uid;
  }

  setToken(token: string) {
    this.myProfile.pushToken = token;
  }

  getToken() {
    if (!this.myProfile.pushToken) {
      return;
    }
    return this.myProfile.pushToken;
  }

  getFirebaseToken() {
    return this.af.collection('Profile').doc(this.myProfile.uid).get();
  }

  updateFirebaseToken(newtoken: string) {
    return this.af.collection('Profile').doc(this.myProfile.uid).update({
      pushToken: newtoken,
    });
  }

  setMyProfile(prof: Profile) {
    this.myProfile = prof;
    console.log(this.myProfile);
  }

  unsubscribeLogOut() {}

  createUsername(profile: Profile) {
    return this.af.collection('Profile').doc(this.myProfile.uid).set(profile);
  }

  getUsernames() {
    return this.af.collection('Profile').get();
  }

  createProfile(uid: string, email: string, username: string) {
    const profile = {
      username,
      name: username,
      description: 'My new Profile',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/playerhub-67922.appspot.com/o/profile.png?alt=media&token=0c4630fc-b0eb-4c08-ab1c-7d534f05fca9',
      uid,
      games: [],
      posts: [],
      reviews: [],
      friends: [],
      achievements: 0,
      email,
      pushToken: '',
    };

    this.myProfile = profile;

    return this.af.collection('Profile').doc(uid).set(profile);
  }

  getProfileData(uid: string) {
    return this.af
      .collection('Profile', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  getReviews(uid: string, startDate: Date) {
    return this.af
      .collection('Reviews', (ref) =>
        ref
          .where('uid', '==', uid)
          .where('postedDate', '<', startDate)
          .orderBy('postedDate', 'desc')
          .limit(2)
      )
      .snapshotChanges();
  }

  getPosts(uid: string, startDate: Date) {
    return this.af
      .collection('Posts', (ref) =>
        ref
          .where('uid', '==', uid)
          .where('postedDate', '<', startDate)
          .orderBy('postedDate', 'desc')
          .limit(3)
      )
      .snapshotChanges();
  }

  getGames(idGames: string[]) {
    return this.af
      .collection('Games', (ref) => ref.where('id-game', 'in', idGames))
      .get();
  }

  getGamePage(gameID: string) {
    return this.af
      .collection('Games', (ref) => ref.where('id-game', '==', gameID))
      .snapshotChanges();
  }

  addGame(gameID: string) {
    const gamesList = [...this.myProfile.games, gameID];

    return this.af
      .collection('Profile')
      .doc(this.myProfile.uid)
      .update({
        games: gamesList,
      })
      .then(
        (res) => {
          this.presentToast('Game Added', 1000, null, 'success');
          this.myProfile.games = gamesList;
        },
        (rej) => {
          this.presentToast('Error Occured', 1000, null, 'warning');
        }
      );
  }

  removeGame(gameID: string) {
    const gamesList = this.arrayRemove(this.myProfile.games, gameID);
    return this.af
      .collection('Profile')
      .doc(this.myProfile.uid)
      .update({
        games: gamesList,
      })
      .then(
        (res) => {
          this.presentToast('Game Removed', 1000, null, 'success');
          this.myProfile.games = gamesList;
        },
        (rej) => {
          this.presentToast('Error Occured', 1000, null, 'warning');
        }
      );
  }

  getGameReviews(gameID: string, startDate: Date) {
    return this.af
      .collection('Reviews', (ref) =>
        ref
          .where('game-id', '==', gameID)
          .where('postedDate', '<', startDate)
          .orderBy('postedDate', 'desc')
          .limit(3)
      )
      .snapshotChanges();
  }

  postReview(
    description: string,
    score: number,
    gameID: string,
    oldReviews: string[]
  ) {
    const id = this.af.createId();
    const ts = new Date();
    const review: Review = {
      avatar: this.myProfile.avatar,
      postedDate: ts,
      date: `${ts.getDate()}/${ts.getMonth()}/${ts.getFullYear()};`,
      description,
      likes: [],
      score,
      'game-id': gameID,
      postReviewID: id,
      uid: this.myProfile.uid,
      username: this.myProfile.username,
    };

    this.af
      .collection('Reviews')
      .doc(id)
      .set(review)
      .then(
        (res) =>
          this.af
            .collection('Games')
            .doc(gameID)
            .update({ reviews: [...oldReviews, id] })
            .then(
              (success) => {
                this.af
                  .collection('Profile')
                  .doc(review.uid)
                  .update({
                    reviews: [...this.myProfile.reviews, id],
                  })
                  .then(
                    (yes) =>
                      this.presentToast(
                        'Review Posted!',
                        null,
                        null,
                        'success'
                      ),
                    (no) =>
                      this.presentToast('Failed to post', null, null, 'warning')
                  );
              },
              (error) =>
                this.presentToast('Failed to post', null, null, 'warning')
            ),
        (rej) => this.presentToast('Failed to post', null, null, 'warning')
      );
  }

  postPost(desc: string, filename: string) {
    const id = this.af.createId();
    const ts = new Date();
    const post: Post = {
      postReviewID: id,
      avatar: this.myProfile.avatar,
      postedDate: ts,
      date: `${ts.getDate()}/${ts.getMonth()}/${ts.getFullYear()};`,
      description: desc,
      uid: this.myProfile.uid,
      likes: [],
      photo: filename,
      username: this.myProfile.username,
    };
    this.af
      .collection('Posts')
      .doc(id)
      .set(post)
      .then(
        (res) => {
          this.af
            .collection('Profile')
            .doc(this.myProfile.uid)
            .update({ posts: [...this.myProfile.posts, id] })
            .then(
              (success) =>
                this.presentToast('Post uploaded!', null, null, 'success'),
              (err) =>
                this.presentToast('Failed to upload!', null, null, 'warning')
            );
        },
        (rej) => {
          console.log(rej);
        }
      );
  }
  getPost(postID) {
    return this.af
      .collection('Posts', (ref) => ref.where('postReviewID', '==', postID))
      .get();
  }

  getReview(revID) {
    return this.af
      .collection('Reviews', (ref) => ref.where('postReviewID', '==', revID))
      .get();
  }

  deletePost(postID) {
    return this.af
      .collection('Profile')
      .doc(this.myProfile.uid)
      .update({
        posts: this.arrayRemove(this.myProfile.posts, postID),
      })
      .then(
        (res) =>
          this.af
            .collection('Posts')
            .doc(postID)
            .delete()
            .then(
              (yes) => this.presentToast('Deleted post', null, null, 'success'),
              (no) =>
                this.presentToast('An error occured', null, null, 'warning')
            ),
        (rej) =>
          this.presentToast('An error has occured', null, null, 'warning')
      );
  }

  likePost(postID, likesArray: string[]) {
    return this.af
      .collection('Posts')
      .doc(postID)
      .update({
        likes: [...likesArray, this.myProfile.uid],
      });
  }

  remLikePost(postID, likesArray: string[]) {
    return this.af
      .collection('Posts')
      .doc(postID)
      .update({
        likes: this.arrayRemove(likesArray, this.myProfile.uid),
      });
  }

  likeReview(postID, likesArray: string[]) {
    return this.af
      .collection('Reviews')
      .doc(postID)
      .update({
        likes: [...likesArray, this.myProfile.uid],
      });
  }

  remLikeReview(postID, likesArray: string[]) {
    return this.af
      .collection('Reviews')
      .doc(postID)
      .update({
        likes: this.arrayRemove(likesArray, this.myProfile.uid),
      });
  }
  /* ---- COMMENTS ---- */
  postPostComment(description: string, postReviewID: string) {
    const id = this.af.createId();

    const comment: Comment = {
      avatar: this.myProfile.avatar,
      commentID: id,
      postedDate: new Date(),
      description,
      postReviewID,
      uid: this.myProfile.uid,
      username: this.myProfile.username,
    };

    this.af
      .collection('Posts')
      .doc(postReviewID)
      .collection('Comments')
      .doc(id)
      .set(comment)
      .then(
        (res) => this.presentToast('Comment Posted!', null, null, 'success'),
        (rej) =>
          this.presentToast('Something went wrong', null, null, 'warning')
      );
  }

  postReviewComment(description: string, postReviewID: string) {
    const id = this.af.createId();

    const comment: Comment = {
      avatar: this.myProfile.avatar,
      commentID: id,
      postedDate: new Date(),
      description,
      postReviewID,
      uid: this.myProfile.uid,
      username: this.myProfile.username,
    };

    this.af
      .collection('Reviews')
      .doc(postReviewID)
      .collection('Comments')
      .doc(id)
      .set(comment)
      .then(
        (res) => this.presentToast('Comment Posted!', null, null, 'success'),
        (rej) =>
          this.presentToast('Something went wrong', null, null, 'warning')
      );
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
  likeComment(postID, commentID, likesArray) {
    return this.af
      .collection('Posts')
      .doc(postID)
      .collection('Comments')
      .doc(commentID)
      .update({
        likes: [...likesArray, this.myProfile.uid],
      });
  }
  remLikeComment(postID, commentID, likesArray) {
    return this.af
      .collection('Posts')
      .doc(postID)
      .collection('Comments')
      .doc(commentID)
      .update({
        likes: this.arrayRemove(likesArray, this.myProfile.uid),
      });
  }

  arrayRemove(arr: any, value: any) {
    return arr.filter((ele: any) => ele !== value);
  }

  async presentToast(message, dur?: number, title?: string, col?: string) {
    const toast = await this.toast.create({
      header: title || '',
      message,
      duration: dur || 2500,
      color: col || 'black',
      position: 'top',
    });
    toast.present();
  }

  addFriend(friendID) {
    const arr = [...this.myProfile.friends, friendID];
    return this.af
      .collection('Profile')
      .doc(this.myProfile.uid)
      .update({ friends: arr })
      .then(
        (res) => {
          this.presentToast('Friend Added!', 800, null, 'medium');
          this.myProfile.friends = arr;
        },
        (err) => this.presentToast('Error Adding', 800, null, 'warning')
      );
  }

  removeFriend(friendID) {
    const arr = this.arrayRemove(this.myProfile.friends, friendID);
    return this.af
      .collection('Profile')
      .doc(this.myProfile.uid)
      .update({ friends: arr })
      .then(
        (res) => {
          this.presentToast('Unfriended', 800, null, 'medium');
          this.myProfile.friends = arr;
        },
        (err) => this.presentToast('Error', 800, null, 'warning')
      );
  }

  getFeed(startDate: Date) {
    return this.af
      .collection('Posts', (ref) =>
        ref
          .where('uid', 'in', this.myProfile.friends)
          .where('postedDate', '<', startDate)
          .orderBy('postedDate', 'desc')
      )
      .snapshotChanges();
  }

  getExploreReviews(startDate: Date) {
    return this.af
      .collection('Reviews', (ref) =>
        ref
          .where('uid', 'in', this.myProfile.friends)
          .where('postedDate', '<', startDate)
          .orderBy('postedDate', 'desc')
          .limit(3)
      )
      .snapshotChanges();
  }

  getExploreGames(startDate: Date) {
    return this.af
      .collection('Games', (ref) =>
        ref
          .where('release-date', '<', startDate)
          .orderBy('release-date', 'desc')
          .limit(3)
      )
      .snapshotChanges();
  }
}
