import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  removeOutline,
  addOutline,
  closeOutline,
  bagCheckOutline,
  alertCircleOutline,
  trashOutline,
  sparklesOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
  flashOutline,
  cartOutline,
} from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartPage implements OnInit {
  product: any =[
    { name: "Bell Pepper Red", img: "assets/92f1ea7dcce3b5d06cd1b1418f9b9413 3 (1).png", price: 4.99, weight: "1kg", background: "background:#f2fff1", subtotal: 0, qunty: 1 },
    { name: "Farm Eggs", img: "assets/pngfuel 16.png", price: 2.99, weight: "12pcs", background: "background:#fff8e5", subtotal: 0, qunty: 1 },
    { name: "Organic Bananas", img: "assets/banana-png-32.png", price: 4.99, weight: "7pcs", background: "background:#fdeaea", subtotal: 0, qunty: 1 },
    { name: "Ginger", img: "assets/a-fresh-ginger-root-with-a-knobby-tan-surface-and-a-textured-appearance-png.webp", price: 4.99, weight: "250gm", background: "background:#f2fff1", subtotal: 0, qunty: 1 },
  ]

  total = 0;
  deliveryFee = 2.99;

  // Interactive 3D Card Physics State
  tiltX = 0;
  tiltY = 0;
  shineX = 50;
  shineY = 50;

  get alertTiltTransform(): string {
    if (!this.alertState.show || this.alertState.isClosing) return '';
    return `perspective(1000px) rotateX(${this.tiltX}deg) rotateY(${this.tiltY}deg) scale3d(1, 1, 1)`;
  }

  // Ultra-Modern Animated Custom Alert State
  alertState: any = {
    show: false,
    isClosing: false,
    type: 'warning', // 'warning' | 'danger' | 'success' | 'checkout'
    pillTag: 'QUANTITY LIMIT',
    title: '',
    message: '',
    badgeIcon: 'alert-circle-outline',
    productPreview: null,
    summaryPreview: null,
    confirmText: 'Got It',
    cancelText: 'Cancel',
    showCancel: false,
    onConfirm: () => { }
  };

  constructor(private router: Router) {
    addIcons({
      'remove-outline': removeOutline,
      'add-outline': addOutline,
      'close-outline': closeOutline,
      'bag-check-outline': bagCheckOutline,
      'alert-circle-outline': alertCircleOutline,
      'trash-outline': trashOutline,
      'sparkles-outline': sparklesOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'information-circle-outline': informationCircleOutline,
      'flash-outline': flashOutline,
      'cart-outline': cartOutline,
    });
  }

  ngOnInit() {
    this.cal();
  }

  onAlertMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 12deg tilt angle
    this.tiltX = -((y - centerY) / centerY) * 10;
    this.tiltY = ((x - centerX) / centerX) * 10;

    this.shineX = (x / rect.width) * 100;
    this.shineY = (y / rect.height) * 100;
  }

  onAlertMouseLeave() {
    this.tiltX = 0;
    this.tiltY = 0;
    this.shineX = 50;
    this.shineY = 50;
  }

  async inc(i: any) {
    const item = this.product[i];

    // Har 5 items pe alert show karo (5, 10, 15, 20...)
    if (item.qunty % 5 === 0) {
      const nextQunty = item.qunty + 1;
      this.openCustomAlert({
        type: 'warning',
        pillTag: 'LIMIT REACHED',
        title: 'Limit Reached 🛒',
        message: `You have added ${item.qunty} items of ${item.name}. Would you like to add a new cart starting from ${nextQunty}?`,
        badgeIcon: 'alert-circle-outline',
        productPreview: item,
        summaryPreview: null,
        confirmText: 'Add New Cart',
        cancelText: 'Cancel',
        showCancel: true,
        onConfirm: () => {
          const newItem = { ...item, qunty: nextQunty, subtotal: nextQunty * item.price };
          this.product.push(newItem);
          this.cal();
          this.closeCustomAlert();
        }
      });
      return;
    }

    item.qunty++;
    this.cal();
  }

  async dec(i: any) {
    const item = this.product[i];

    // Quantity 1 ho to remove alert show karo
    if (item.qunty <= 1) {
      this.openCustomAlert({
        type: 'danger',
        pillTag: 'REMOVE ITEM',
        title: 'Remove from Cart? 🗑️',
        message: `${item.name} is at minimum quantity. Do you want to remove it from your cart?`,
        badgeIcon: 'trash-outline',
        productPreview: item,
        summaryPreview: null,
        confirmText: 'Yes, Remove',
        cancelText: 'Keep Item',
        showCancel: true,
        onConfirm: () => {
          this.product.splice(i, 1);
          this.cal();
          this.closeCustomAlert();
        }
      });
      return;
    }

    item.qunty--;
    this.cal();

    // 6→5, 11→10, 16→15, 21→20... (jab bhi 5 ka multiple ho jaye) tab alert
    if (item.qunty % 5 === 0) {
      this.openCustomAlert({
        type: 'danger',
        pillTag: 'LOW QUANTITY',
        title: 'Remove from Cart? 🗑️',
        message: `${item.name} quantity dropped below ${item.qunty + 1}. Do you want to remove it from your cart?`,
        badgeIcon: 'trash-outline',
        productPreview: item,
        summaryPreview: null,
        confirmText: 'Yes, Remove',
        cancelText: 'Keep Item',
        showCancel: true,
        onConfirm: () => {
          const idx = this.product.indexOf(item);
          if (idx > -1) { this.product.splice(idx, 1); this.cal(); }
          this.closeCustomAlert();
        }
      });
    }
  }

  async removeItem(i: any) {
    const item = this.product[i];
    this.openCustomAlert({
      type: 'danger',
      pillTag: 'REMOVE ITEM',
      title: 'Remove from Cart?',
      message: `Are you sure you want to remove ${item.name} from your shopping list?`,
      badgeIcon: 'trash-outline',
      productPreview: item,
      summaryPreview: null,
      confirmText: 'Yes, Remove',
      cancelText: 'Keep Item',
      showCancel: true,
      onConfirm: () => {
        this.product.splice(i, 1);
        this.cal();
        this.closeCustomAlert();
      }
    });
  }

  clearCart() {
    if (this.product.length === 0) return;
    this.openCustomAlert({
      type: 'danger',
      pillTag: 'EMPTY WHOLE CART',
      title: 'Clear Entire Cart?',
      message: `This action will remove all ${this.product.length} items from your shopping basket.`,
      badgeIcon: 'trash-outline',
      productPreview: null,
      summaryPreview: null,
      confirmText: 'Clear All Items',
      cancelText: 'Keep Cart',
      showCancel: true,
      onConfirm: () => {
        this.product = [];
        this.cal();
        this.closeCustomAlert();
      }
    });
  }

  proceedToCheckout() {
    if (this.product.length === 0) {
      this.openCustomAlert({
        type: 'warning',
        pillTag: 'EMPTY CART',
        title: 'Your Cart is Empty',
        message: 'Add some fresh products to your cart before proceeding to checkout!',
        badgeIcon: 'cart-outline',
        productPreview: null,
        summaryPreview: null,
        confirmText: 'Explore Products',
        showCancel: false,
        onConfirm: () => {
          this.closeCustomAlert();
          this.router.navigate(['/explore']);
        }
      });
      return;
    }

    const itemCount = this.product.reduce((acc: number, cur: any) => acc + cur.qunty, 0);

    this.openCustomAlert({
      type: 'checkout',
      pillTag: 'ORDER CONFIRMATION',
      title: 'Ready for Checkout? 🛍️',
      message: `You are about to place an order for ${itemCount} items with free express delivery!`,
      badgeIcon: 'bag-check-outline',
      productPreview: null,
      summaryPreview: {
        itemCount: itemCount,
        subtotal: this.total.toFixed(2),
        delivery: 'FREE',
        total: this.total.toFixed(2)
      },
      confirmText: 'Proceed to Payment',
      cancelText: 'Modify Cart',
      showCancel: true,
      onConfirm: () => {
        this.closeCustomAlert();
        this.router.navigate(['/checkout']);
      }
    });
  }

  openCustomAlert(config: any) {
    this.tiltX = 0;
    this.tiltY = 0;
    this.alertState = {
      ...this.alertState,
      ...config,
      show: true,
      isClosing: false
    };
  }

  closeCustomAlert() {
    this.alertState.isClosing = true;
    setTimeout(() => {
      this.alertState.show = false;
      this.alertState.isClosing = false;
    }, 280);
  }

  cal() {
    this.total = 0;
    for (let i = 0; i < this.product.length; i++) {
      this.product[i].subtotal = this.product[i].qunty * this.product[i].price;
      this.total = this.total + this.product[i].subtotal;
    }
  }

}




