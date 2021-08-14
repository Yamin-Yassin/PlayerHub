import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

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
  constructor() {}

  ngOnInit() {
    this.username = 'yaminyassin';
    this.selectedSegment = 'games';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
