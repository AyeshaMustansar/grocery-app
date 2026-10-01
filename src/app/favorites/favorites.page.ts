import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  heart,
  star,
  searchOutline,
  cartOutline,
} from 'ionicons/icons';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class FavoritesPage {
product:any=signal([
  {name:"Organic Bananas",img:"../../assets/banana-png-32.png",price:4.99,rating:4.2,background:"background:#fdeaea"},
  {name:"Red Apple",img:"../../assets/apple.png",price:4.99,rating:4.4,background:"background:#fdeaea"},
  {name:"Bell Pepper Red",img:"../../assets/92f1ea7dcce3b5d06cd1b1418f9b9413 3 (1).png",price:4.99,rating:4.3,background:"background:#f2fff1"},
  {name:"Farm Eggs",img:"../../assets/pngtree-a-woven-basket-overflowing-with-fresh-brown-eggs-on-transparent-background-png-image_16771015.webp",price:2.99,rating:4.7,background:"background:#fff8e5"},
])

  constructor(private router: Router) {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'heart': heart,
      'star': star,
      'search-outline': searchOutline,
      'cart-outline': cartOutline,
    });
  }

  goBack() {
    this.router.navigate(['/home-screen']);
  }


gotoproduct(item: any) {
  this.router.navigate(['/product-detial'], {
    queryParams: {
      name: item.name,
      price: item.price,
      img: item.img,
      rating: item.rating,
    },
  });
}

}
