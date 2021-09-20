import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '@fire/fireauth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: FireauthService,
    private popover: PopoverController
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.doLogout().then(
      (res) => {
        this.dismiss();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log('erro');
      }
    );
  }

  async dismiss() {
    await this.popover.dismiss();
  }
}
