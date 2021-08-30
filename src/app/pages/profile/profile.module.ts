import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PostComponentModule } from '@components/post/post.component.module';
import { GamePlayerComponentModule } from '@components/game-player/game-player.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PostComponentModule,
    GamePlayerComponentModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
