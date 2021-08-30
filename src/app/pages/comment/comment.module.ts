import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { PostComponentModule } from '@components/post/post.component.module';
import { ReplyComponent } from '@components/reply/reply.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule,
    ReactiveFormsModule,
    PostComponentModule,
  ],
  declarations: [CommentPage, ReplyComponent],
})
export class CommentPageModule {}
