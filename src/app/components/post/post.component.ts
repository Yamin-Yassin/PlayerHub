import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview } from '@AppTypes/appTypes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: PostReview;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Post component', this.data);
  }

  goToProfile() {
    localStorage.getItem('user');
  }
}
