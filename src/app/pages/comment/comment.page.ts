import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reply } from '@AppTypes/appTypes';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  public originalData: any;

  comments: Reply[] = [
    {
      username: 'yaminyassin',
      avatar: '../../../assets/img/sofia.png',
      description:
        'do it squirt? is ur booty real wet? do it fart? can i smell?',
      datetime: '10 jul 2021',
      date: Date.now().toString(),
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.originalData = history.state.data;
    console.log(this.originalData);
  }

  goBack() {
    this.location.back();
  }

  navigateProfile() {
    this.router.navigate(['/profile/coco']);
  }
}
