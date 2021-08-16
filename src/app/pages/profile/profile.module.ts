import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PostComponent } from 'src/app/components/post/post.component';
import { GamePlayerComponent } from 'src/app/components/game-player/game-player.component';
import { ReviewGameComponentModule } from '@components/review-game/review-game.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReviewGameComponentModule,
  ],
  declarations: [ProfilePage, PostComponent, GamePlayerComponent],
})
export class ProfilePageModule {}
