/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview, isReview, Comment, Game } from '@AppTypes/appTypes';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: PostReview;
  comments = [];

  gameData: Game;
  isGamePage = false;
  isLiked = false;
  isSelf = false;
  constructor(
    private router: Router,
    private fire: FireService,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.getComments();
    this.isLiked = this.data.likes.includes(this.fire.myProfile.uid);
    this.isSelf = this.fire.myProfile.uid === this.data.uid;
    this.isGamePage = this.router.url.split('/')[1] === 'game-page';
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
    if (!isReview(this.data)) {
      this.fire.likePost(this.data.postReviewID, this.data.likes).then(
        (res) => {
          this.isLiked = true;
          this.data.likes.push(this.fire.getUID());
        },
        (rej) => console.log('failed to like', rej.message)
      );
    } else {
      this.fire.likeReview(this.data.postReviewID, this.data.likes).then(
        (res) => {
          this.isLiked = true;
          this.data.likes.push(this.fire.getUID());
        },
        (rej) => console.log('failed to like', rej.message)
      );
    }
  }

  dislike() {
    if (!isReview(this.data)) {
      this.fire.remLikePost(this.data.postReviewID, this.data.likes).then(
        (res) => {
          this.isLiked = false;
          this.data.likes.pop();
        },
        (rej) => console.log('failed to dislike', rej.message)
      );
    } else {
      this.fire.remLikeReview(this.data.postReviewID, this.data.likes).then(
        (res) => {
          this.isLiked = false;
          this.data.likes.pop();
        },
        (rej) => console.log('failed to dislike', rej.message)
      );
    }
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
      this.fire.getGamePage(this.data['game-id']).subscribe((data) => {
        data.forEach((e) => {
          this.gameData = JSON.parse(JSON.stringify(e.payload.doc.data()));
          console.log('game = ', this.gameData.name);
        });
      });
    }
  }
}
