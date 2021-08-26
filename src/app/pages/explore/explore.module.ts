import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { ReviewExploreComponent } from '@components/review-explore/review-explore.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExplorePageRoutingModule],
  declarations: [ExplorePage, ReviewExploreComponent],
})
export class ExplorePageModule {}
