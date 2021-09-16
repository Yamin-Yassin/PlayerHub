import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { FireService } from '@fire/fire.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private fire: FireService, private platform: Platform) {}

  public async takePhoto(): Promise<PhotoInfo> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: this.platform.is('capacitor')
        ? CameraSource.Prompt
        : CameraSource.Camera,
      allowEditing: false,
      quality: 100,
    });

    console.log('captured Photo!');

    const base64 = await this.readAsBase64(capturedPhoto);

    const timetoday = new Date().getTime();

    const newfilename = this.fire.getUID() + '/' + timetoday + '.jpg';

    console.log('CAPTURED PHOTO FILENAME: ', newfilename);

    const pic: PhotoInfo = {
      base64string: base64,
      filepath: newfilename,
      webpath: capturedPhoto.webPath,
    };

    return pic; //base64String
  }

  async readAsBase64(photo: Photo): Promise<string> {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob);
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}

export interface PhotoInfo {
  filepath: string;
  base64string: string | null;
  webpath: any;
}
