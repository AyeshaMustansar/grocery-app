import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  chevronBackOutline,
  flashOutline,
  calendarOutline,
  cubeOutline,
  locationOutline,
  cardOutline,
} from 'ionicons/icons';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class DeliveryPage {

  constructor() {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'flash-outline': flashOutline,
      'calendar-outline': calendarOutline,
      'cube-outline': cubeOutline,
      'location-outline': locationOutline,
      'card-outline': cardOutline,
    });
  }
}