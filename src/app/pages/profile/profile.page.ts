import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedSegment:string;
  username:string;
  constructor() { }

  ngOnInit() {
    this.username="yaminyassin"
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
