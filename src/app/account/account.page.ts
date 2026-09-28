import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  bagHandleOutline,
  cardOutline,
  locationOutline,
  pricetagOutline,
  notificationsOutline,
  helpCircleOutline,
  informationCircleOutline,
  createOutline,
  chevronForwardOutline,
  logOutOutline,
  searchOutline,
  moonOutline,
  cameraOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(private router: Router) {
    addIcons({
      'bag-handle-outline': bagHandleOutline,
      'card-outline': cardOutline,
      'location-outline': locationOutline,
      'pricetag-outline': pricetagOutline,
      'notifications-outline': notificationsOutline,
      'help-circle-outline': helpCircleOutline,
      'information-circle-outline': informationCircleOutline,
      'create-outline': createOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'log-out-outline': logOutOutline,
      'search-outline': searchOutline,
      'moon-outline': moonOutline,
      'camera-outline': cameraOutline,
    });
  }
}
