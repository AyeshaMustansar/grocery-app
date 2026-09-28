import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { eyeOffOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class SignUpPage {

  constructor(private router: Router) {
    addIcons({ 'eye-off-outline': eyeOffOutline });
  }
  goTologin(){
    this.router.navigate(['/log-in']);
  }

}