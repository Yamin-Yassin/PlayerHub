import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    private afFunc: AngularFireFunctions
  ) {}

  ngOnInit() {}

  addPhotoToGallery() {
    //this.photoService.addNewToGallery();
  }
}
