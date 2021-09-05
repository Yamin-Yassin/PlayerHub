import { FireService } from '@fire/fire.service';
import { Post } from './../../core/types/appTypes';
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
  constructor(private router: Router, private fire: FireService) {}

  ngOnInit() {
    if (this.isPost(this.data)) {
      this.fire.getPostComments(this.data['post-id']);
    } else {
      this.fire.getReviewComments(this.data['review-id']);
    }
  }

  isPost(data: PostReview): data is Post {
    return (data as Post)['post-id'] !== undefined;
  }

  navigateProfile() {
    this.router.navigate([`/profile/${this.data.uid}`]);
  }
  navigateComment() {
    this.router.navigate([`/comment/${this.data['post-id']}`], {
      state: { data: this.data },
    });
  }
}
