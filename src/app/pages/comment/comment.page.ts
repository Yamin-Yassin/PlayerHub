/* eslint-disable @typescript-eslint/dot-notation */
import { FireService } from '@fire/fire.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment, isReview, PostReview } from '@AppTypes/appTypes';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  data: PostReview;
  comments: Comment[] = [];
  description = '';
  loading = false;

  constructor(
    private location: Location,
    public fire: FireService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPost();
  }

  goBack() {
    this.location.back();
  }
  setDescription(ev: any) {
    this.description = ev.target.value;
  }

  postComment() {
    if (this.description.length !== 0) {
      if (!isReview(this.data)) {
        this.fire.postPostComment(this.description, this.data.postReviewID);
      } else {
        this.fire.postReviewComment(this.description, this.data.postReviewID);
      }
      this.description = '';
    }
  }

  getPost() {
    if (history.state.data) {
      this.data = history.state.data;
      if (!isReview(this.data)) {
        this.fire
          .getPostComments(this.data['postReviewID'])
          .subscribe((commentsData) => {
            this.comments = [];

            commentsData.forEach((e) => {
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
          .getReviewComments(this.data['postReviewID'])
          .subscribe((commentsData) => {
            this.comments = [];

            commentsData.forEach((e) => {
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
      this.loading = true;
    } else {
      this.fire
        .getPost(this.activatedRoute.snapshot.paramMap.get('ID'))
        .pipe(take(1))
        .subscribe(
          (data) => {
            data.forEach(
              (e) => (this.data = JSON.parse(JSON.stringify(e.data())))
            );

            if (!isReview(this.data)) {
              this.fire
                .getPostComments(this.data['postReviewID'])
                .subscribe((commentsData) => {
                  this.comments = [];

                  commentsData.forEach((e) => {
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
                .getReviewComments(this.data['postReviewID'])
                .subscribe((commentsData) => {
                  this.comments = [];

                  commentsData.forEach((e) => {
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
            this.loading = true;
          },
          (error) => (this.loading = false)
        );
    }
  }
}
