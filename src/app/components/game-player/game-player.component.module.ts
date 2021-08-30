import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GamePlayerComponent } from './game-player.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [GamePlayerComponent],
  exports: [GamePlayerComponent],
})
export class GamePlayerComponentModule {}
