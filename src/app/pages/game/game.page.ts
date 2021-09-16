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
  reviews: PostReview[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fire: FireService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

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

        this.fire.getGameReviews(this.game['id-game']).subscribe((revData) => {
          this.reviews = [];
          revData.forEach((rev) => {
            const review: PostReview = JSON.parse(
              JSON.stringify(rev.payload.doc.data())
            );
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
}
