import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  constructor(public photoService: PhotoService) {}

  ngOnInit() {}
}
