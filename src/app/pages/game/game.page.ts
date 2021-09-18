/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, PostReview } from '@AppTypes/appTypes';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: string;
  game: Game;
  isLoaded = false;
  isAdded = false;

  reviews: PostReview[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    public fire: FireService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.isAdded = this.fire.myProfile.games.includes(this.id);

    this.fire.getGamePage(this.id).subscribe((data) => {
      data.forEach((e) => {
        const ts = e.payload.doc.data()['release-date'].toDate();
        const date = `${ts.getDate()}/${ts.getMonth()}/${ts.getFullYear()};`;

        this.game = {
          images: e.payload.doc.data()['images'],
          'id-game': e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          studio: e.payload.doc.data()['studio'],
          score: 8.3,
          'release-date': date,
          platforms: e.payload.doc.data()['platforms'],
          genre: e.payload.doc.data()['genre'],
          reviews: e.payload.doc.data()['reviews'],
        };

        this.fire
          .getGameReviews(this.game['id-game'], new Date())
          .subscribe((revData) => {
            this.reviews = [];
            revData.forEach((rev) => {
              const review: PostReview = {
                avatar: rev.payload.doc.data()['avatar'],
                postedDate: rev.payload.doc.data()['postedDate'],
                date: rev.payload.doc.data()['date'],
                description: rev.payload.doc.data()['description'],
                likes: rev.payload.doc.data()['likes'],
                score: rev.payload.doc.data()['score'],
                'game-id': rev.payload.doc.data()['game-id'],
                postReviewID: rev.payload.doc.data()['postReviewID'],
                uid: rev.payload.doc.data()['uid'],
                username: rev.payload.doc.data()['username'],
              };
              this.reviews.push(review);
            });
          });
      });
      this.isLoaded = true;
    });
  }

  goBack() {
    this.location.back();
  }

  gotoReview() {
    this.router.navigate([`/write-review/${this.id}`], {
      state: { data: this.game },
    });
  }

  getMoreReviews(ev: any) {
    try {
      this.fire
        .getGameReviews(
          this.game['id-game'],
          this.reviews[this.reviews.length - 1].postedDate
        )
        .subscribe((revData) => {
          revData.forEach((rev) => {
            const review: PostReview = {
              avatar: rev.payload.doc.data()['avatar'],
              postedDate: rev.payload.doc.data()['postedDate'],
              date: rev.payload.doc.data()['date'],
              description: rev.payload.doc.data()['description'],
              likes: rev.payload.doc.data()['likes'],
              score: rev.payload.doc.data()['score'],
              'game-id': rev.payload.doc.data()['game-id'],
              postReviewID: rev.payload.doc.data()['postReviewID'],
              uid: rev.payload.doc.data()['uid'],
              username: rev.payload.doc.data()['username'],
            };
            this.reviews.push(review);
          });
          setTimeout(() => {
            ev.target.complete();
          }, 1500);
        });
    } catch (error) {
      setTimeout(() => {
        ev.target.complete();
        console.log(error);
      }, 1500);
    }
    setTimeout(() => {
      ev.target.complete();
    }, 1500);
  }

  addGame() {
    this.fire.addGame(this.id).then(
      (res) => (this.isAdded = this.fire.myProfile.games.includes(this.id)),
      (rej) => console.log(rej)
    );
  }

  removeGame() {
    this.fire.removeGame(this.id).then(
      (res) => (this.isAdded = this.fire.myProfile.games.includes(this.id)),
      (rej) => console.log(rej)
    );
  }
}
