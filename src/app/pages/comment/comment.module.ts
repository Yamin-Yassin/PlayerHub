import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { ReviewGameComponentModule } from '@components/review-game/review-game.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule,
    ReactiveFormsModule,
    ReviewGameComponentModule,
  ],
  declarations: [CommentPage],
})
export class CommentPageModule {}
