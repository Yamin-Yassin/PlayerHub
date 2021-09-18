/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview } from '@AppTypes/appTypes';
import { FireService } from '@fire/fire.service';
import { FireauthService } from '@fire/fireauth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  content: PostReview[] = [];
  isLoading = false;
  loaded = false;
  constructor(
    private authService: FireauthService,
    private router: Router,
    private fire: FireService
  ) {}

  ngOnInit() {
    console.log('Initializing HomePage');
    if (!(this.fire.myProfile.friends.length === 0)) {
      this.fire
        .getFeed(new Date())
        ?.pipe(take(1))
        ?.subscribe(
          (data) => {
            this.isLoading = true;
            this.content = [];
            data.forEach((e) => {
              this.content.push({
                avatar: e.payload.doc.data()['avatar'],
                postedDate: e.payload.doc.data()['postedDate'],
                date: e.payload.doc.data()['date'],
                description: e.payload.doc.data()['description'],
                likes: e.payload.doc.data()['likes'],
                photo: e.payload.doc.data()['photo'],
                postReviewID: e.payload.doc.data()['postReviewID'],
                uid: e.payload.doc.data()['uid'],
                username: e.payload.doc.data()['username'],
              });
            });
            this.isLoading = false;
            this.loaded = true;
          },
          (error) => {
            this.isLoading = false;
            this.loaded = true;
          }
        );
    }
  }

  logout() {
    this.isLoading = true;
    this.authService.doLogout().then(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      (err) => {
        this.isLoading = false;
        console.log('erro');
      }
    );
  }

  doRefresh(ev: any) {
    if (this.fire.myProfile.friends.length === 0) {
      setTimeout(() => {
        this.content = [];
        ev.target.complete();
      }, 2000);
    } else {
      this.fire
        ?.getFeed(new Date())
        ?.pipe(take(1))
        ?.subscribe(
          (data) => {
            this.content = [];
            data.forEach((e) => {
              this.content.push({
                avatar: e.payload.doc.data()['avatar'],
                postedDate: e.payload.doc.data()['postedDate'],
                date: e.payload.doc.data()['date'],
                description: e.payload.doc.data()['description'],
                likes: e.payload.doc.data()['likes'],
                photo: e.payload.doc.data()['photo'],
                postReviewID: e.payload.doc.data()['postReviewID'],
                uid: e.payload.doc.data()['uid'],
                username: e.payload.doc.data()['username'],
              });
            });
            setTimeout(() => {
              ev.target.complete();
              this.loaded = true;
            }, 1000);
          },
          (error) => {
            setTimeout(() => {
              ev.target.complete();
              this.loaded = true;
            }, 1000);
            console.error(error);
          }
        );
    }
  }
}
