import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: string;
  game: {
    images: string[] | null;
    name: string;
    studio: string;
    score: number | null;
    releaseDate: string | null;
    platforms: string[] | null;
    genre: string[];
    reviews: string[] | null;
  };
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
      reviews: ['paisjdpajspdj', 'aoisdjoisajdoijsi'],
    };
  }

  goBack() {
    this.location.back();
  }

  gotoReview() {
    this.router.navigate([`/write-review/${this.id}`]);
  }
}
