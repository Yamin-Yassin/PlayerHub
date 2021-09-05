import { FireService } from '@fire/fire.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, isPost, PostReview } from '@AppTypes/appTypes';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  public data: PostReview;

  comments: Comment[] = [];
  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private fire: FireService
  ) {}

  ngOnInit() {
    this.data = history.state.data;
    if (isPost(this.data)) {
      this.fire
        .getPostComments(this.data['post-id'])
        .subscribe((commentsData) => {
          this.comments = [];

          commentsData.forEach((e) => {
            const comment: Comment = {
              avatar: e.payload.doc.data()['avatar'],
              'comment-id': e.payload.doc.data()['comment-id'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              'post-review-id': e.payload.doc.data()['post-review-id'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.comments.push(comment);
          });
        });
    } else {
      this.fire
        .getReviewComments(this.data['review-id'])
        .subscribe((commentsData) => {
          this.comments = [];

          commentsData.forEach((e) => {
            const comment: Comment = {
              avatar: e.payload.doc.data()['avatar'],
              'comment-id': e.payload.doc.data()['comment-id'],
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              'post-review-id': e.payload.doc.data()['post-review-id'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.comments.push(comment);
          });
        });
    }
  }

  goBack() {
    this.location.back();
  }

  navigateProfile() {
    this.router.navigate(['/profile/coco']);
  }
}
