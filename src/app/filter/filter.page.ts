import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ionic-g',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonButton,
    IonContent,
    CommonModule,
    FormsModule
  ]
})
export class FilterPage implements OnInit {

  // Alert open/close
  isAlertOpen = false;

  // Alert button
  alertButtons = ['Action'];

  // Alert open/close function
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor() {}

  ngOnInit() {}

}