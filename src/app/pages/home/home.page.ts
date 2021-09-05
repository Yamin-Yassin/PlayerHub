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
      avatar: '../../../assets/img/sofia.png',
      date: '10 jul',
      description: 'first post hehe',
      likes: [],
      photo: '../../../assets/img/sofia.png',
      'post-id': 'postidhere',
      uid: 'JmSunvmAGaTWkLM8pGQL3ZDzNRB2',
      username: 'YaminYassin',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.content.push({
      avatar: '../../../assets/img/sofia.png',
      date: '10 jul',
      description: 'first post hehe',
      likes: [],
      photo: '../../../assets/img/sofia.png',
      'post-id': 'postidhere',
      uid: 'JmSunvmAGaTWkLM8pGQL3ZDzNRB2',
      username: 'YaminYassin',
    });
  }
}
