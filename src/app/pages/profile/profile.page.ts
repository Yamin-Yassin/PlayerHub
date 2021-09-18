/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
import { Component, OnInit } from '@angular/core';
import { Game, Post, Review } from '@AppTypes/appTypes';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedSegment: string;
  loaded = false;
  games: Game[] = [];
  posts: Post[] = [];
  reviews: Review[] = [];
  ngames = 0;
  nfriends = 0;

  constructor(public fire: FireService) {}

  ngOnInit() {
    this.selectedSegment = 'games';

    this.ngames = this.fire.myProfile.games.length;
    this.nfriends = this.fire.myProfile.friends.length;

    this.fire.getGames(this.fire.myProfile.games).subscribe(
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
          };
          this.games.push(game);
        });

        console.log(this.games);
      },
      (error) => console.log(JSON.stringify(error))
    );

    this.loaded = true;
  }

  segmentChanged(ev: any) {
    switch (ev.detail.value) {
      case 'games':
        this.fire.getGames(this.fire.myProfile.games).subscribe(
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
              };
              this.games.push(game);
            });

            console.log(this.games);
          },
          (error) => console.log(JSON.stringify(error))
        );
        break;
      case 'posts':
        this.fire.getPosts(this.fire.getUID(), new Date()).subscribe(
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
        this.fire.getReviews(this.fire.getUID(), new Date()).subscribe(
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
      default:
        break;
    }
    console.log('Segment changed', ev);
  }

  getMorePosts(ev: any) {
    this.fire
      .getPosts(
        this.fire.getUID(),
        this.posts[this.posts.length - 1].postedDate
      )
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
        this.fire.getUID(),
        this.reviews[this.reviews.length - 1].postedDate
      )
      .pipe(take(1))
      .subscribe(
        (reviewData) => {
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
