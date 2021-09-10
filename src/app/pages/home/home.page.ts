import { Component, OnInit } from '@angular/core';
import { PostReview } from '@AppTypes/appTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public content: PostReview[] = [];

  constructor() {}

  ngOnInit() {
    console.log('Initializing HomePage');
  }
}
