import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireService } from '@fire/fire.service';
import { AlertController } from '@ionic/angular';
import { PhotoInfo, PhotoService } from '@services/photo.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  photo: PhotoInfo;
  url: string;
  description = '';
  constructor(
    public photoService: PhotoService,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private fire: FireService
  ) {}

  ngOnInit() {}

  async confirmPost() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('OKAY');
            this.submitPost();
          },
        },
      ],
    });

    await alert.present();
  }

  async uploadPicture() {
    const pic = await this.photoService.takePhoto();
    this.photo = { base64string: pic[0], filepath: pic[1] };
    console.log(JSON.stringify(this.photo));
  }

  async submitPost() {
    /*  1. Colocar imagem no Firebase Storage */
    const ref = this.storage.ref('uploaded/' + this.photo.filepath);

    /*  2. Buscar o URL da imagem guardada. */
    const task = ref.putString(this.photo.base64string, 'base64');
    task.then(
      (res) => {
        ref.getDownloadURL().subscribe(async (url) => {
          this.url = url;
          const idPost = this.fire.createID();
          let posts: any = [];
          /*  4. Criar documento na coleção "profile" do próprio user */
          this.fire.postPost(idPost, this.description, this.url);

          this.fire.getProfileData(this.fire.getUID()).subscribe((data) => {
            data.forEach((e) => {
              console.log(e.payload.doc.data());
              posts = e.payload.doc.data()['posts'];
            });
            console.log('posts =>', posts);
            this.fire.updateProfilePost(idPost, posts);
          });
        });
      },
      (rej) => {
        console.log('ERROR PUBLISHING POST ---> ', rej);
      }
    );
  }
}
