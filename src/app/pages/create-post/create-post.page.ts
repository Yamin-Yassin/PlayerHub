import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FireService } from '@fire/fire.service';
import { PhotoInfo, PhotoService } from '@fire/photo.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  photo: PhotoInfo;
  url: string;
  description = '';
  isLoading = false;

  constructor(
    public photoService: PhotoService,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private fire: FireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  async confirmPost() {
    const alert = await this.alertCtrl.create(
      this.photo != null
        ? {
            header: 'Are you sure you want to post?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
              },
              {
                text: 'Okay',
                handler: () => {
                  console.log('OKAY');
                  this.submitPost();
                },
              },
            ],
          }
        : {
            header: 'Please choose a photo',
            buttons: [
              {
                text: 'Okay',
                role: 'cancel',
              },
            ],
          }
    );

    await alert.present();
  }

  async uploadPicture() {
    this.photo = await this.photoService.takePhoto();
    console.log(this);
  }

  async submitPost() {
    /*  1. Colocar imagem no Firebase Storage */
    this.isLoading = true;
    const ref = this.storage.ref(this.photo.filepath);

    /*  2. Buscar o URL da imagem guardada. */
    const task = ref
      .putString(this.photo.base64string.split(',')[1], 'base64')
      .then(
        (res) => {
          ref.getDownloadURL().subscribe(async (url) => {
            this.url = url;
            /*  4. Criar documento na coleção "profile" do próprio user */
            this.fire.postPost(this.description, this.url);
            this.isLoading = false;
            this.description = '';
            this.photo = null;
          });
        },
        (rej) => {
          this.isLoading = false;
          console.log('ERROR PUBLISHING POST ---> ', rej);
        }
      );
  }

  setDescription(ev: any) {
    this.description = ev.target.value;
  }
}
