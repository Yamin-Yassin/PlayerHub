import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


import { ReviewGameComponent } from '../../components/review-game/review-game.component';
import { ReviewPlayerComponent } from '../../components/review-player/review-player.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ReviewGameComponent, 
    ReviewPlayerComponent
    ]
})
export class HomePageModule {}
