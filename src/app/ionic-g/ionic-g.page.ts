import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ionic-g',
  templateUrl: './ionic-g.page.html',
  styleUrls: ['./ionic-g.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IonicGPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
