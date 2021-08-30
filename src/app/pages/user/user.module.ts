import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { PostComponentModule } from '@components/post/post.component.module';
import { GamePlayerComponentModule } from '@components/game-player/game-player.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    PostComponentModule,
    GamePlayerComponentModule,
  ],
  declarations: [UserPage],
})
export class UserPageModule {}
