/* eslint-disable @typescript-eslint/dot-notation */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game, Post, Profile, Review } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';

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

  constructor(private loc: Location, private fire: FireService) {}

  ngOnInit() {
    this.selectedSegment = 'games';

    this.fire.getProfileData(history.state.data).subscribe((data) => {
      data.forEach((e) => {
        this.user = JSON.parse(JSON.stringify(e.payload.doc.data()));
      });
      this.ngames = this.fire.myProfile.games.length;
      this.nfriends = this.fire.myProfile.friends.length;

      this.fire.getGames(this.fire.myProfile.games).subscribe(
        (gameData) => {
          this.games = [];

          gameData.forEach((e) => {
            const game = {
              genre: e.payload.doc.data()['genre'],
              'id-game': e.payload.doc.data()['id-game'],
              images: e.payload.doc.data()['images'],
              name: e.payload.doc.data()['name'],
              platforms: e.payload.doc.data()['platforms'],
              'release-date': e.payload.doc.data()['release-date'],
              studio: e.payload.doc.data()['studio'],
            };
            this.games.push(game);
          });

          console.log(this.games);
        },
        (error) => console.log(JSON.stringify(error))
      );

      this.fire.getPosts(this.fire.getUID()).subscribe(
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
        },
        (error) => console.log(JSON.stringify(error))
      );

      this.fire.getReviews(this.fire.getUID()).subscribe(
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

      this.loaded = true;
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  navigateBack() {
    this.loc.back();
  }
}
