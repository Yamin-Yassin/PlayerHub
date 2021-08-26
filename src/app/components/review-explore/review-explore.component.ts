import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-explore',
  templateUrl: './review-explore.component.html',
  styleUrls: ['./review-explore.component.scss'],
})
export class ReviewExploreComponent implements OnInit {
  review = {
    username: 'yaminyassin',
    avatar: '../../../assets/img/sofia.png',
    name: 'Super Mario Odyssey',
    cover: '../../../assets/img/sofia.png',
    score: 8.7,
    description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
    sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
     directly inspired by the games that came before it in its characters, music, and mechanics. `,
  };
  score = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.review.description = this.review.description.slice(0, 95) + '.';
  }

  showScore() {
    this.score = !this.score;

    setTimeout(() => (this.score = false), 3000);
  }

  navigate() {
    this.router.navigate([`/game-page/`]);
  }
}
