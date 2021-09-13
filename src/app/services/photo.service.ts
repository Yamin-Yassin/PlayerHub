import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { FireService } from '@fire/fire.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo;

  constructor(private fser: FireService) {}

  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera,
      allowEditing: false,
      quality: 100,
    });
    // Save the picture and add it to photo collection
    //const savedImageFile = await this.savePicture(capturedPhoto);
    //const response = await fetch(capturedPhoto.webPath!);
    //const blob = await response.blob();

    const timetoday = new Date().getTime();
    const newfilename = '' + timetoday + '.jpg';
    console.log('newfilename: ', newfilename);
    console.log('PHOTO PATH: ', capturedPhoto.path);
    console.log('PHOTO WEBPATH: ', capturedPhoto.webPath);
    console.log('PHOTO DATA_URL: ', capturedPhoto.dataUrl);
    console.log('CAPTURED PHOTO: ', capturedPhoto);
    console.log('CAPTURED PHOTO BASE 64: ', capturedPhoto.base64String);
    console.log('CAPTURED PHOTO FILENAME: ', newfilename);

    return [capturedPhoto.base64String, newfilename]; //base64String
  }
}

export interface PhotoInfo {
  filepath: string;
  base64string: string;
}
