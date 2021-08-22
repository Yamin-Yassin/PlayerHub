import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-game',
  templateUrl: './review-game.component.html',
  styleUrls: ['./review-game.component.scss'],
})
export class ReviewGameComponent implements OnInit {
  review = {
    username: 'yaminyassin',
    avatar: '../../../assets/img/sofia.png',
    score: 8.7,
    description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
    sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
     directly inspired by the games that came before it in its characters, music, and mechanics. `,
  };

  constructor() {}

  ngOnInit() {}
}
