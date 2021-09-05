/* eslint-disable @typescript-eslint/dot-notation */
import { StorageService } from '@fire/storage.service';
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
  public isLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fire: FireService,
    private storage: StorageService
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
          reviews: [
            {
              avatar: '../../../assets/img/sofia.png',
              date: '10 jul',
              description:
                'Odyssey looks like a straight successor to the Mario 64 and Sunshine line of sandbox 3D Marios,\
            but it is much more than that.Naturally, it evokes, honors, and is sometimes directly inspired\
             by the games that came before it in its characters, music, and mechanics. ',
              likes: [],
              score: 8,
              'game-id': '',
              'review-id': '',
              uid: 'JmSunvmAGaTWkLM8pGQL3ZDzNRB2',
              username: 'YaminYassin',
            },
          ],
        };
        console.log('game object ', this.game);
        this.isLoaded = true;
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
