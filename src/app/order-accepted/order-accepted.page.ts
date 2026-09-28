import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-order-accepted',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './order-accepted.page.html',
  styleUrls: ['./order-accepted.page.scss'],
})
export class OrderAcceptedPage {}