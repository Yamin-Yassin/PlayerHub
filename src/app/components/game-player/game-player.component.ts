import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss'],
})
export class GamePlayerComponent implements OnInit {
  id: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.id = 'coco';
  }

  navigate() {
    this.router.navigate([`/game-page/${this.id}`]);
  }
}
