import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photo: Photo = {
    filepath: '',
    base64string: '',
  };

  constructor() {}

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      allowEditing: false,
      quality: 100,
    });
    this.photo = {
      filepath: capturedPhoto.path,
      base64string: capturedPhoto.base64String,
    };
    console.log(this.photo);
    return this.photo;
  }
}

export interface Photo {
  filepath: string;
  base64string: string;
}
