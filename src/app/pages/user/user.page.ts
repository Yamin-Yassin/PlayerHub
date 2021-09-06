import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostReview } from '@AppTypes/appTypes';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  selectedSegment: string;
  username: string;
  coisos: string[] = ['a', 'v', 'c'];

  user = {
    username: 'yaminyassin',
    avatar: '../../../assets/img/sofia.png',
    name: 'Yamin Yassin',
    description: 'i love games and playing with food',
    nGames: 10,
    nAchievements: 100,
    nFriends: 200,
  };

  post: PostReview = {
    avatar: '../../../assets/img/sofia.png',
    date: '10 jul',
    description: 'first post hehe',
    likes: [],
    photo: '../../../assets/img/sofia.png',
    'post-id': 'postidhere',
    uid: 'JmSunvmAGaTWkLM8pGQL3ZDzNRB2',
    username: 'YaminYassin',
  };

  review: PostReview = {
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
  };
  constructor(private loc: Location) {}

  ngOnInit() {
    this.username = 'yaminyassin';
    this.selectedSegment = 'games';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  navigateBack() {
    this.loc.back();
  }
}
