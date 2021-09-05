import { FireService } from '@fire/fire.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview, isPost } from '@AppTypes/appTypes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: PostReview;
  constructor(private router: Router, private fire: FireService) {}

  ngOnInit() {}

  navigateProfile() {
    this.router.navigate([`/profile/${this.data.uid}`]);
  }
  navigateComment() {
    if (isPost(this.data)) {
      this.router.navigate([`/comment/${this.data['post-id']}`], {
        state: { data: this.data },
      });
    } else {
      this.router.navigate([`/comment/${this.data['review-id']}`], {
        state: { data: this.data },
      });
    }
  }
}
