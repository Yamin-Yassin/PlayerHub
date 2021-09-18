import { Component, OnInit } from '@angular/core';
import { Game, Review } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  slideOpts = {
    slidesPerView: 2,
    grabCursor: true,
    spaceBetween: 0,
    centeredSlides: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  loading = false;

  reviews: Review[] = [];
  games: Game[] = [];

  constructor(private fire: FireService) {}

  ngOnInit() {
    this.getReviews();
    this.getGames();
  }

  getReviews() {
    this.loading = true;
    this.fire
      .getExploreReviews(new Date())
      ?.pipe(take(1))
      ?.subscribe(
        (data) => {
          this.reviews = [];
          data.forEach((e) => {
            this.reviews.push(e.payload.doc.data() as Review);
          });
          console.log('explore');
          this.loading = false;
        },
        (error) => (this.loading = false)
      );
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  getGames() {
    this.loading = true;
    this.fire
      .getExploreGames(new Date())
      ?.pipe(take(1))
      ?.subscribe(
        (data) => {
          this.games = [];
          data.forEach((e) => {
            this.games.push(e.payload.doc.data() as Game);
          });
          console.log('explore');
          this.loading = false;
        },
        (error) => (this.loading = false)
      );
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  getMoreGames() {
    this.fire
      .getExploreGames(this.games[this.games.length - 1]['release-date'])
      ?.pipe(take(1))
      ?.subscribe(
        (data) => {
          data.forEach((e) => {
            this.games.push(e.payload.doc.data() as Game);
          });
          console.log('explore');
        },
        (error) => {
          console.log(error);
        }
      );
    setTimeout(() => {}, 2000);
  }

  getMoreReviews(ev: any) {
    this.fire
      .getExploreReviews(this.reviews[this.reviews.length - 1].postedDate)
      ?.pipe(take(1))
      ?.subscribe(
        (data) => {
          data.forEach((e) => {
            this.reviews.push(e.payload.doc.data() as Review);
          });
          ev.target.complete();
          console.log('explore');
        },
        (error) => {
          ev.target.complete();
          console.log(error);
        }
      );
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }
}
