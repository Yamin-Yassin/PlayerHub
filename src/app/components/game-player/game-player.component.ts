import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '@AppTypes/appTypes';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss'],
})
export class GamePlayerComponent implements OnInit {
  @Input() data: Game;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate() {
    this.router.navigate([`/game-page/${this.data['id-game']}`]);
  }
}
