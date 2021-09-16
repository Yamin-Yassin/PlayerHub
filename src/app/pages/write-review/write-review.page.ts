/* eslint-disable @typescript-eslint/dot-notation */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})
export class WriteReviewPage implements OnInit {
  game: Game;
  description = '';
  score = 5;
  constructor(
    private fire: FireService,
    private location: Location,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.game = history.state.data;
  }

  goBack() {
    this.location.back();
  }
  setScore(ev: any) {
    this.score = ev.target.value;
  }
  setDescription(ev: any) {
    this.description = ev.target.value;
  }

  submit() {
    this.fire.postReview(
      this.description,
      this.score,
      this.game['id-game'],
      this.game['reviews']
    );

    this.goBack();
  }

  async confirmPost() {
    const alert = await this.alert.create({
      header: 'Are you sure you want to post this review?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: () => {
            this.submit();
          },
        },
      ],
    });

    await alert.present();
  }
}
