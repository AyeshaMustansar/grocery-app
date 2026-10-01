import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  searchOutline,
  optionsOutline,
  addOutline,
  heartOutline,
} from 'ionicons/icons';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class ExplorePage {
product:any=signal([
  {name:"Organic Bananas",img:"assets/banana-png-32.png",price:4.99,weight:"7pcs, Price",background:"background:#fdeaea",},
  {name:"Red Apple",img:"assets/apple.png",price:4.99,weight:"1kg, Price",background:"background:#fdeaea",},
  {name:"Fresh Orange",img:"assets/orange.png",price:3.99,weight:"1kg, Price",background:"background:#fdeaea"},
  {name:"Green Grapes",img:"assets/pngtree-fresh-green-grapes-in-basket-on-white-background-png-image_16520626.png",price:5.49,weight:"500gm, Price",background:"background:#fdeaea"},
  {name:"Mango",img:"assets/mango.png",price:4.49,weight:"1kg, Price",background:"background:#fdeaea"},
  {name:"Strawberry",img:"assets/ai-generated-strawberries-in-a-basket-isolated-on-transparent-background-free-png.webp",price:3.49,weight:"250gm, Price",background:"background:#fdeaea"},
  {name:"Bell Pepper Red",img:"assets/92f1ea7dcce3b5d06cd1b1418f9b9413 3 (1).png",price:4.99,weight:"1kg, Price",background:"background:#f2fff1"},
  {name:"Ginger",img:"assets/a-fresh-ginger-root-with-a-knobby-tan-surface-and-a-textured-appearance-png.webp",price:4.99,weight:"250gm, Price",background:"background:#f2fff1"},
  {name:"Tomato",img:"assets/6-tomato-png-image.png",price:2.99,weight:"1kg, Price",background:"background:#f2fff1"},
  {name:"Garlic",img:"assets/garlic.png",price:1.99,weight:"250gm, Price",background:"background:#f2fff1"},
  {name:"Onion",img:"assets/vibrant-fresh-sliced-onion-crisp-and-flavorful-culinary-ingredient-ai-generated-free-png.webp",price:2.49,weight:"1kg, Price",background:"background:#f2fff1"},
  {name:"Potato",img:"assets/potato.png",price:1.99,weight:"1kg, Price",background:"background:#f2fff1"},
  {name:"Beef Bone",img:"assets/beef.png",price:4.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Broiler Chicken",img:"assets/chicken.png",price:4.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Rui Fish",img:"assets/fish.png",price:6.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Farm Eggs",img:"assets/pngfuel 16.png",price:2.99,weight:"12pcs, Price",background:"background:#fff8e5"},
  {name:"Fresh Milk",img:"assets/milk.webp",price:1.99,weight:"1L, Price",background:"background:#fff8e5"},
])
detail:any=signal([
  {name:"Fruits",img:"assets/fruits.png",background:"background:#fdeaea"},
  {name:"Vegetables",img:"assets/pngtree-organic-vegetables-png-image_17417140.png",background:"background:#f2fff1"},
  {name:"Cooking Oil",img:"assets/pngfuel 8.png",background:"background:#fef6ed"},
  {name:"Meat & Fish",img:"assets/pngfuel 9.png",background:"background:#eaf2fb"},
  {name:"Bakery",img:"assets/pngfuel 6 (3).png",background:"background:#f4ebf7"},
  {name:"Dairy & Egg",img:"assets/pngfuel.png",background:"background:#fff8e5"},
  {name:"Beverages",img:"assets/pngfuel 6 (4).png",background:"background:#edf7fc"},
  {name:"Rice",img:"assets/8-82858_download-sack-of-rice-png 1.png",background:"background:#ddf4df"},
])

  constructor(private router: Router) {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'search-outline': searchOutline,
      'options-outline': optionsOutline,
      'add-outline': addOutline,
      'heart-outline': heartOutline,
    });
  }

gotocard(){
  this.router.navigate(['/product-detial'])
}
goTohome(){
  this.router.navigate(['/home-screen'])
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
