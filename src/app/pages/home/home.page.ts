import { Component, OnInit } from '@angular/core';
import { PostReview } from '@AppTypes/appTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public content: PostReview[] = [
    {
      username: 'yaminyassin',
      avatar: '../../../assets/img/sofia.png',
      score: 8.7,
      description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
    sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
     directly inspired by the games that came before it in its characters, music, and mechanics. `,
      photo: null,
      datetime: '10 jul',
      date: Date.now().toString(),
    },
  ];

  constructor() {}

  ngOnInit() {
    this.content.push({
      username: 'yaminyassin',
      avatar: '../../../assets/img/sofia.png',
      score: 8.7,
      description: ` Odyssey looks like a straight successor to the Mario 64 and Sunshine line of
      sandbox 3D Marios, but it is much more than that.Naturally, it evokes, honors, and is sometimes
       directly inspired by the games that came before it in its characters, music, and mechanics. `,
      photo: null,
      datetime: '10 jul',
      date: Date.now().toString(),
    });
  }
}
