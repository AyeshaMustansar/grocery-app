import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { searchOutline, locationSharp, heartOutline, addOutline } from 'ionicons/icons';

addIcons({
  'search-outline': searchOutline,
  'location-sharp': locationSharp,
  'heart-outline': heartOutline,
  'add-outline': addOutline,
});

@Component({
  standalone: true,
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeScreenPage {


product:any=signal([
  {name:"Organic Bananas",img:"assets/banana-png-32.png",price:4.99,weight:"7pcs, Price"},
  {name:"Red Apple",img:"assets/apple.png",price:4.99,weight:"1kg, Price"},
  {name:"Fresh Orange",img:"assets/orange.png",price:3.99,weight:"1kg, Price"},
  {name:"Green Grapes",img:"assets/pngtree-fresh-green-grapes-in-basket-on-white-background-png-image_16520626.png",price:5.49,weight:"500gm, Price"},
  {name:"Mango",img:"assets/mango.png",price:4.49,weight:"1kg, Price"},
  {name:"Strawberry",img:"assets/ai-generated-strawberries-in-a-basket-isolated-on-transparent-background-free-png.webp",price:3.49,weight:"250gm, Price"},
])
detail:any=signal([
  {name:"Bell Pepper Red",img:"assets/92f1ea7dcce3b5d06cd1b1418f9b9413 3 (1).png",price:4.99,weight:"1kg, Price"},
  {name:"Ginger",img:"assets/a-fresh-ginger-root-with-a-knobby-tan-surface-and-a-textured-appearance-png.webp",price:4.99,weight:"250gm, Price"},
  {name:"Tomato",img:"assets/6-tomato-png-image.png",price:2.99,weight:"1kg, Price"},
  {name:"Garlic",img:"assets/garlic.png",price:1.99,weight:"250gm, Price"},
  {name:"Onion",img:"assets/vibrant-fresh-sliced-onion-crisp-and-flavorful-culinary-ingredient-ai-generated-free-png.webp",price:2.49,weight:"1kg, Price"},
  {name:"Potato",img:"assets/potato.png",price:1.99,weight:"1kg, Price"},
])
button:any=signal([
  {name:"Pulses",img:"assets/4215936-pulses-png-8-png-image-pulses-png-409_409 1.png",background:"background:#fbead1"},
  {name:"Rice",img:"assets/8-82858_download-sack-of-rice-png 1.png",background:"background:#ddf4df"},
  {name:"Vegetables",img:"assets/pngtree-organic-vegetables-png-image_17417140.png",background:"background:#f2fff1"},
  {name:"Fruits",img:"assets/fruits.png",background:"background:#fdeaea"},
  {name:"Dairy",img:"assets/pngfuel.png",background:"background:#fff8e5"},
  {name:"Spices",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop",background:"background:#fbe9e0"},
])
grocery:any=signal([
  {name:"Beef Bone",img:"assets/beef.png",price:4.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Broiler Chicken",img:"assets/chicken.png",price:4.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Rui Fish",img:"assets/fish.png",price:6.99,weight:"1kg, Price",background:"background:#eaf2fb"},
  {name:"Farm Eggs",img:"assets/pngfuel 16.png",price:2.99,weight:"12pcs, Price",background:"background:#fff8e5"},
  {name:"Fresh Milk",img:"assets/milk.webp",price:1.99,weight:"1L, Price",background:"background:#fff8e5"},
])

  constructor(private router: Router) {}


  // gotoproduct(){
  //   this.router.navigate(['/product-detial'])
  // }


  

gotoproduct(item: any) {
  this.router.navigate(['/product-detial'], {
    queryParams: {
      name: item.name,
      img: item.img,
      price: item.price,
      weight: item.weight
    }
  });
}

}
