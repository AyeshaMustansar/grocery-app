import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

 //// first impot the active route in  ts and constructor also 
import { Router ,ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  heartOutline,
  chevronDownOutline,
  chevronForwardOutline,
  star,
  removeOutline,
  addOutline,
} from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-product-detial',
  templateUrl: './product-detial.page.html',
  styleUrls: ['./product-detial.page.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetialPage {





  product: any;
constructor(private router: Router, private route: ActivatedRoute) {
  this.route.queryParams.subscribe(params => {
    this.product = {
      name: params['name'],
      price: Number(params['price']),   // query params are always strings
      img: params['img'],
      rating: Number(params['rating']),
    };
  });







  


    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'heart-outline': heartOutline,
      'chevron-down-outline': chevronDownOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'star': star,
      'remove-outline': removeOutline,
      'add-outline': addOutline,
    });
  }

  goBack() {
    this.router.navigate(['/home-screen']);
  }



  
}