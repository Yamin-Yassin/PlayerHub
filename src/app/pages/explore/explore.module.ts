import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { GamePlayerComponent } from '@components/game-player/game-player.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExplorePageRoutingModule],
  declarations: [ExplorePage, GamePlayerComponent],
})
export class ExplorePageModule {}
