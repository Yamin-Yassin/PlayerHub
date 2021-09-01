/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
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
    private location: Location,
    private fire: FireService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.fire.getGamePage('IPZbmWySXRFFsdpTNAls').subscribe((data) => {
      data.forEach((e) => {
        console.log('GetGamePage() raw ----> ', e.payload.doc.data());

        this.game = {
          images: [
            '../../../assets/img/sofia.png',
            '../../../assets/img/sofia.png',
            '../../../assets/img/sofia.png',
            '../../../assets/img/sofia.png',
          ],
          gameID: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          studio: e.payload.doc.data()['studio'],
          score: 8.3,
          releaseDate: e.payload.doc.data()['release-date'],
          platforms: e.payload.doc.data()['platforms'],
          genre: e.payload.doc.data()['genre'],
          reviews: [
            {
              username: 'yaminyassin',
              avatar: '../../../assets/img/sofia.png',
              score: 8.7,
              description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
            sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
             directly inspired by the games that came before it in its characters, music, and mechanics. `,
              photo: null,
              datetime: 'asdpska',
              date: Date.now().toString(),
            },
          ],
        };
        console.log('game object ', this.game);
      });
    });
  }

  goBack() {
    this.location.back();
  }

  gotoReview() {
    this.router.navigate([`/write-review/${this.id}`]);
  }
}
