import { Component, OnInit } from '@angular/core';
import { PostReview } from '@AppTypes/appTypes';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
    username: 'YaminYassin',
    avatar: '../../../assets/img/sofia.png',
    description: 'first post hehe',
    photo: '../../../assets/img/sofia.png',
    score: null,
  };

  review: PostReview = {
    username: 'YaminYassin',
    avatar: '../../../assets/img/sofia.png',
    description:
      'Odyssey looks like a straight successor to the Mario 64 and Sunshine line of sandbox 3D Marios,\
       but it is much more than that.Naturally, it evokes, honors, and is sometimes directly inspired\
        by the games that came before it in its characters, music, and mechanics. ',
    photo: null,
    score: 8,
  };
  constructor(public photoService: PhotoService) {}

  ngOnInit() {
    this.username = 'yaminyassin';
    this.selectedSegment = 'games';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  addPhotoToGallery() {
    this.photoService.addnewToGallery();
  }
}
