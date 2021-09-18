import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment, monthNames } from '@AppTypes/appTypes';
import firebase from 'firebase/app';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() data: Comment;
  shortDate = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const date: Date = this.data.postedDate.toDate();
    this.shortDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;
  }

  navigateProfile() {
    this.router.navigate([`/profile/${this.data.uid}`], {
      state: { data: this.data.uid },
    });
  }
}
