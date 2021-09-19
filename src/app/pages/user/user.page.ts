/* eslint-disable @typescript-eslint/dot-notation */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game, Post, Profile, Review } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  selectedSegment: string;
  loaded = false;
  games: Game[] = [];
  posts: Post[] = [];
  reviews: Review[] = [];
  ngames = 0;
  nfriends = 0;

  user: Profile;

  isSelf = false;
  isFriend = false;

  constructor(private loc: Location, private fire: FireService) {}

  ngOnInit() {
    this.selectedSegment = 'games';

    this.fire.getProfileData(history.state.data).subscribe((data) => {
      data.forEach((e) => {
        this.user = JSON.parse(JSON.stringify(e.payload.doc.data()));
      });

      this.ngames = this.fire.myProfile.games.length;
      this.nfriends = this.fire.myProfile.friends.length;

      this.isSelf = this.fire.myProfile.uid === this.user.uid;
      this.isFriend = this.fire.myProfile.friends.includes(this.user.uid);

      this.fire.getGames(this.user.games).subscribe(
        (gameData) => {
          this.games = [];

          gameData.forEach((e) => {
            const game = {
              genre: e.data()['genre'],
              'id-game': e.data()['id-game'],
              images: e.data()['images'],
              name: e.data()['name'],
              platforms: e.data()['platforms'],
              'release-date': e.data()['release-date'],
              studio: e.data()['studio'],
              score: e.data()['score'],
            };
            this.games.push(game);
          });
        },
        (error) => console.log(JSON.stringify(error))
      );
      this.loaded = true;
    });
  }

  segmentChanged(ev: any) {
    switch (ev.detail.value) {
      case 'posts':
        this.fire.getPosts(this.user.uid, new Date()).subscribe(
          (postData) => {
            this.posts = [];
            postData.forEach((e) => {
              const post = {
                avatar: e.payload.doc.data()['avatar'],
                postedDate: e.payload.doc.data()['postedDate'],
                date: e.payload.doc.data()['date'],
                description: e.payload.doc.data()['description'],
                likes: e.payload.doc.data()['likes'],
                photo: e.payload.doc.data()['photo'],
                postReviewID: e.payload.doc.data()['postReviewID'],
                uid: e.payload.doc.data()['uid'],
                username: e.payload.doc.data()['username'],
              };
              this.posts.push(post);
            });
            console.log('got Posts');
          },
          (error) => console.error(JSON.stringify(error))
        );
        break;
      case 'reviews':
        this.fire.getReviews(this.user.uid, new Date()).subscribe(
          (reviewData) => {
            this.reviews = [];

            reviewData.forEach((e) => {
              const review = {
                avatar: e.payload.doc.data()['avatar'],
                postedDate: e.payload.doc.data()['postedDate'],
                date: e.payload.doc.data()['date'],
                description: e.payload.doc.data()['description'],
                likes: e.payload.doc.data()['likes'],
                score: e.payload.doc.data()['score'],
                'game-id': e.payload.doc.data()['game-id'],
                postReviewID: e.payload.doc.data()['postReviewID'],
                uid: e.payload.doc.data()['uid'],
                username: e.payload.doc.data()['username'],
              };
              this.reviews.push(review);
            });
          },
          (error) => console.log(JSON.stringify(error))
        );
        break;
    }
    console.log('Segment changed', ev);
  }

  navigateBack() {
    this.loc.back();
  }

  add() {
    this.fire.addFriend(this.user.uid).then(
      (res) =>
        (this.isFriend = this.fire.myProfile.friends.includes(this.user.uid)),
      (rej) => console.log(rej)
    );
  }

  remove() {
    this.fire.removeFriend(this.user.uid).then(
      (res) =>
        (this.isFriend = this.fire.myProfile.friends.includes(this.user.uid)),
      (rej) => console.log(rej)
    );
  }

  getMorePosts(ev: any) {
    this.fire
      .getPosts(this.user.uid, this.posts[this.posts.length - 1].postedDate)
      .pipe(take(1))
      .subscribe(
        (postData) => {
          postData.forEach((e) => {
            const post = {
              avatar: e.payload.doc.data()['avatar'],
              postedDate: e.payload.doc.data()['postedDate'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              likes: e.payload.doc.data()['likes'],
              photo: e.payload.doc.data()['photo'],
              postReviewID: e.payload.doc.data()['postReviewID'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.posts.push(post);
          });
          console.log('got More Posts');
          ev.target.complete();
        },
        (error) => console.error(JSON.stringify(error))
      );
  }

  getMoreReviews(ev: any) {
    this.fire
      .getReviews(
        this.user.uid,
        this.reviews[this.reviews.length - 1].postedDate
      )
      .pipe(take(1))
      .subscribe(
        (reviewData) => {
          this.reviews = [];

          reviewData.forEach((e) => {
            const review = {
              avatar: e.payload.doc.data()['avatar'],
              postedDate: e.payload.doc.data()['postedDate'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              likes: e.payload.doc.data()['likes'],
              score: e.payload.doc.data()['score'],
              'game-id': e.payload.doc.data()['game-id'],
              postReviewID: e.payload.doc.data()['postReviewID'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.reviews.push(review);
          });
          ev.target.complete();
        },
        (error) => console.log(JSON.stringify(error))
      );
  }

  doRefresh(ev: any) {
    this.fire
      .getProfileData(this.fire.getUID())
      .pipe(take(1))
      .subscribe((data) => {
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
        this.ngames = this.fire.myProfile.games.length;
        this.nfriends = this.fire.myProfile.friends.length;
        ev.target.complete();
      });
  }
}
