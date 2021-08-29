import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '@AppTypes/appTypes';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: string;
  public game: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.game = {
      images: [
        '../../../assets/img/sofia.png',
        '../../../assets/img/sofia.png',
        '../../../assets/img/sofia.png',
        '../../../assets/img/sofia.png',
      ],
      name: 'Prey',
      studio: 'Arcane Studios',
      score: 8.3,
      releaseDate: '10/07/2018',
      platforms: ['Nintendo Switch', 'Playstation'],
      genre: ['horror', 'sim'],
      reviews: [
        {
          username: 'yaminyassin',
          avatar: '../../../assets/img/sofia.png',
          score: 8.7,
          description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
        sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
         directly inspired by the games that came before it in its characters, music, and mechanics. `,
          photo: null,
        },
      ],
    };
  }

  goBack() {
    this.location.back();
  }

  gotoReview() {
    this.router.navigate([`/write-review/${this.id}`]);
  }
}
