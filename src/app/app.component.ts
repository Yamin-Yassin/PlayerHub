import { Component } from '@angular/core';
import { FcmService } from '@fire/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fmcService: FcmService) {
    this.initializeApp();
  }

  initializeApp() {
    this.fmcService.initNotifications();
  }
}
