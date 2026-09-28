import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'splash-screen',
    loadComponent: () => import('./splash-screen/splash-screen.page').then( m => m.SplashScreenPage)
  },
  {
    path: 'onbording',
    loadComponent: () => import('./onbording/onbording.page').then( m => m.OnbordingPage)
  },
  {
    path: 'log-in',
    loadComponent: () => import('./log-in/log-in.page').then( m => m.LogInPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'home-screen',
    loadComponent: () => import('./home-screen/home-screen.page').then( m => m.HomeScreenPage)
  },
  {
    path: 'product-detial',
    loadComponent: () => import('./product-detial/product-detial.page').then( m => m.ProductDetialPage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'filter',
    loadComponent: () => import('./filter/filter.page').then( m => m.FilterPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then( m => m.AccountPage)
  },
  {
    path: 'order-accepted',
    loadComponent: () => import('./order-accepted/order-accepted.page').then( m => m.OrderAcceptedPage)
  },

  {
    path: 'delivery',
    loadComponent: () => import('./delivery/delivery.page').then( m => m.DeliveryPage)
  },
  {
    path: 'ionic-g',
    loadComponent: () => import('./ionic-g/ionic-g.page').then( m => m.IonicGPage)
  },
  {
    path: 'shipping',
    loadComponent: () => import('./shipping/shipping.page').then( m => m.ShippingPage)
  },
  {
    path: 'check',
    loadComponent: () => import('./check/check.page').then( m => m.CheckPage)
  },
];
