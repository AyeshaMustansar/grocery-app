import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  chevronDownOutline,
  locationOutline,
  cardOutline,
  bagHandleOutline,
  checkmarkCircle,
  personOutline,
  callOutline,
} from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class ShippingPage {

  constructor(private router: Router) {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-down-outline': chevronDownOutline,
      'location-outline': locationOutline,
      'card-outline': cardOutline,
      'bag-handle-outline': bagHandleOutline,
      'checkmark-circle': checkmarkCircle,
      'person-outline': personOutline,
      'call-outline': callOutline,
    });
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}