/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview, isReview, Comment, monthNames } from '@AppTypes/appTypes';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: PostReview;
  comments = [];
  isLiked = false;

  constructor(
    private router: Router,
    private fire: FireService,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.isLiked = this.data.likes.includes(this.fire.getUID());
    this.getComments();
  }

  navigateProfile() {
    this.router.navigate([`/profile/${this.data.uid}`], {
      state: { data: this.data.uid },
    });
  }

  navigateComment() {
    this.router.navigate([`/comment/${this.data['postReviewID']}`], {
      state: { data: this.data },
    });
  }

  async confirmDelete() {
    const alert = await this.alert.create({
      header: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: () => {
            this.fire.deletePost(this.data['postReviewID']);
          },
        },
      ],
    });

    await alert.present();
  }

  likePost() {
    this.fire.likePost(this.data.postReviewID, this.data.likes);
  }

  dislike() {
    this.fire.remLikePost(this.data.postReviewID, this.data.likes);
  }

  getComments() {
    if (!isReview(this.data)) {
      this.fire
        .getPostComments(this.data.postReviewID)
        .subscribe((commentData) => {
          this.comments = [];

          commentData.forEach((e) => {
            const comment: Comment = {
              avatar: e.payload.doc.data()['avatar'],
              commentID: e.payload.doc.data()['commentID'],
              postedDate: e.payload.doc.data()['postedDate'],
              description: e.payload.doc.data()['description'],
              postReviewID: e.payload.doc.data()['postReviewID'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.comments.push(comment);
          });
        });
    } else {
      this.fire
        .getReviewComments(this.data.postReviewID)
        .subscribe((commentData) => {
          this.comments = [];

          commentData.forEach((e) => {
            const comment: Comment = {
              avatar: e.payload.doc.data()['avatar'],
              commentID: e.payload.doc.data()['commentID'],
              postedDate: e.payload.doc.data()['postedDate'],
              description: e.payload.doc.data()['description'],
              postReviewID: e.payload.doc.data()['postReviewID'],
              uid: e.payload.doc.data()['uid'],
              username: e.payload.doc.data()['username'],
            };
            this.comments.push(comment);
          });
        });
    }
  }
}
