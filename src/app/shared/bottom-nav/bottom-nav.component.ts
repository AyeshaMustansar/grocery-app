import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription, filter, startWith } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  storefront,
  storefrontOutline,
  compass,
  compassOutline,
  cart,
  cartOutline,
  heart,
  heartOutline,
  personCircle,
  personCircleOutline,
} from 'ionicons/icons';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  iconActive: string;
  color: string;
  bg: string;
}

@Component({
  standalone: true,
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  imports: [CommonModule, IonIcon],
})
export class BottomNavComponent implements OnDestroy {
  navItems: NavItem[] = [
    { label: 'Shop', route: '/home-screen', icon: 'storefront-outline', iconActive: 'storefront', color: '#ff5c7a', bg: '#ffe3ea' },
    { label: 'Explore', route: '/explore', icon: 'compass-outline', iconActive: 'compass', color: '#7b61ff', bg: '#ece7ff' },
    { label: 'Cart', route: '/cart', icon: 'cart-outline', iconActive: 'cart', color: '#17b6b9', bg: '#d8f5f5' },
    { label: 'Favourite', route: '/favorites', icon: 'heart-outline', iconActive: 'heart', color: '#ffa726', bg: '#fff1d9' },
    { label: 'Account', route: '/account', icon: 'person-circle-outline', iconActive: 'person-circle', color: '#ff4fa3', bg: '#ffe1f0' },
  ];

  // -1 means "current page is not one of the five tabs" → the bar stays hidden.
  activeIndex = -1;

  private sub: Subscription;

  constructor(private router: Router) {
    addIcons({
      storefront,
      'storefront-outline': storefrontOutline,
      compass,
      'compass-outline': compassOutline,
      cart,
      'cart-outline': cartOutline,
      heart,
      'heart-outline': heartOutline,
      'person-circle': personCircle,
      'person-circle-outline': personCircleOutline,
    });

    // The active pill follows the router, so it is already correct the moment the
    // new page starts animating in — no second tap needed. Cancelled/failed
    // navigations resync too, so the pill can never point at a page we never reached.
    this.sub = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ),
        startWith(null)
      )
      .subscribe(() => this.syncActiveIndex());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectItem(index: number): void {
    const target = this.navItems[index].route;
    if (index === this.activeIndex) {
      return; // already here — don't re-trigger a page transition
    }
    // Paint the new active pill immediately, then navigate.
    this.activeIndex = index;
    this.router.navigate([target]);
  }

  private syncActiveIndex(): void {
    // Strip query params / fragments before matching, e.g. "/cart?from=explore".
    const url = this.router.url.split(/[?#]/)[0];
    this.activeIndex = this.navItems.findIndex((item) => item.route === url);
  }
}
