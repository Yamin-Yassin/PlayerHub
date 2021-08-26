import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  slideOpts = {
    slidesPerView: 2,
    grabCursor: true,
    spaceBetween: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  constructor(public photoService: PhotoService) {}

  ngOnInit() {}
}
