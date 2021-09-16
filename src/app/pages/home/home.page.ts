import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostReview } from '@AppTypes/appTypes';
import { FireauthService } from '@fire/fireauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public content: PostReview[] = [];

  constructor(private authService: FireauthService, private router: Router) {}

  ngOnInit() {
    console.log('Initializing HomePage');
  }

  logout() {
    this.authService.doLogout().then(
      (res) => this.router.navigate(['/login']),
      (err) => console.log('erro')
    );
  }
}
