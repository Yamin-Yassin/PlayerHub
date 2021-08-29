import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { GamePlayerComponent } from 'src/app/components/game-player/game-player.component';
import { PostComponentModule } from '@components/post/post.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PostComponentModule,
  ],
  declarations: [ProfilePage, GamePlayerComponent],
})
export class ProfilePageModule {}
