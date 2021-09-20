import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PostComponentModule } from '@components/post/post.component.module';
import { GamePlayerComponentModule } from '@components/game-player/game-player.component.module';
import { SettingsPopoverComponent } from '@components/settings-popover/settings-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PostComponentModule,
    GamePlayerComponentModule,
  ],
  declarations: [ProfilePage, SettingsPopoverComponent],
})
export class ProfilePageModule {}
