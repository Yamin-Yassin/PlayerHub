import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { PostComponentModule } from '@components/post/post.component.module';
import { GamePlayerComponentModule } from '@components/game-player/game-player.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    PostComponentModule,
    GamePlayerComponentModule,
  ],
  declarations: [ExplorePage],
})
export class ExplorePageModule {}
