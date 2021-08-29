import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PostComponent } from '@components/post/post.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostComponentModule {}
