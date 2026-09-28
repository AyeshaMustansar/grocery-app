import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { BottomNavComponent } from './shared/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, BottomNavComponent],
})
export class AppComponent {
  constructor() {}
}
