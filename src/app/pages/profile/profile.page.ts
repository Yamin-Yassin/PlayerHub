import { FireService } from '@fire/fire.service';
import { Component, OnInit } from '@angular/core';
import { Game, Post, Review, Profile } from '@AppTypes/appTypes';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedSegment: string;
  loaded = false;
  user: Profile;
  games: Game[] = [];
  posts: Post[] = [];
  reviews: Review[] = [];
  ngames = 0;
  nfriends = 0;

  constructor(public photoService: PhotoService, private fire: FireService) {}

  ngOnInit() {
    this.selectedSegment = 'games';

    this.fire
      .getProfileData('JmSunvmAGaTWkLM8pGQL3ZDzNRB2')
      .subscribe((data) => {
        data.forEach((e) => {
          this.user = {
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
          };
        });

        this.ngames = this.user.games.length;
        this.nfriends = this.user.friends.length;

        this.fire.getGames(this.user.games).subscribe((gameData) => {
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
        });

        this.fire.getPosts(this.user.uid).subscribe((postData) => {
          this.posts = [];

          postData.forEach((e) => {
            const post = {
              avatar: e.payload.doc.data()['avatar'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              likes: e.payload.doc.data()['likes'],
              photo: e.payload.doc.data()['photo'],
              'post-id': e.payload.doc.data()['post-id'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.posts.push(post);
          });
        });

        this.fire.getReviews(this.user.uid).subscribe((reviewData) => {
          this.reviews = [];

          reviewData.forEach((e) => {
            const review = {
              avatar: e.payload.doc.data()['avatar'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              likes: e.payload.doc.data()['likes'],
              score: e.payload.doc.data()['score'],
              'game-id': e.payload.doc.data()['game-id'],
              'review-id': e.payload.doc.data()['review-id'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.reviews.push(review);
          });
        });

        this.loaded = true;
      });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  addPhotoToGallery() {
    this.photoService.addnewToGallery();
  }
}
