import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { AlertService } from '../alert.service';
import {
  eyeOffOutline,
  eyeOutline,
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LogInPage implements OnDestroy {

  // Saved (correct) credentials
  savedEmail: string = '123@gmail.com';
  savedPassword: string = '123';

  // User input
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  // Form state
  isLoading: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  // 3-attempt lockout
  failedAttempts: number = 0;
  isLockedOut: boolean = false;
  lockoutSeconds: number = 10;
  private lockoutTimer: any = null;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    addIcons({
      'eye-off-outline': eyeOffOutline,
      'eye-outline': eyeOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToHome() {
    if (this.isLoading || this.isLockedOut) return;

    this.emailError = false;
    this.passwordError = false;

    const trimmedEmail = this.email ? this.email.trim() : '';
    const trimmedPassword = this.password ? this.password.trim() : '';

    this.isLoading = true;

    setTimeout(async () => {
      this.isLoading = false;

      // 1. Empty fields
      if (!trimmedEmail || !trimmedPassword) {
        this.emailError = !trimmedEmail;
        this.passwordError = !trimmedPassword;
        await this.handleFailedAttempt(
          'Credentials Required',
          'Please enter both your email and password to continue.'
        );
        return;
      }

      const isEmailCorrect =
        trimmedEmail.toLowerCase() === this.savedEmail.toLowerCase();
      const isPasswordCorrect = trimmedPassword === this.savedPassword;

      // 2. Correct login
      if (isEmailCorrect && isPasswordCorrect) {
        this.failedAttempts = 0;
        await this.alertService.showAlert(
          'Login Successful!',
          'Welcome back! Your fresh market cart and offers are ready.',
          [
            {
              text: 'Explore Groceries',
              handler: () => {
                this.router.navigate(['/home-screen']);
              },
            },
          ]
        );
        return;
      }

      // 3. Wrong login
      this.emailError = !isEmailCorrect;
      this.passwordError = !isPasswordCorrect;

      let errorMsg = '';
      if (!isEmailCorrect && !isPasswordCorrect) {
        errorMsg = 'Both the email and password provided are incorrect.';
      } else if (!isEmailCorrect) {
        errorMsg = 'We could not find an account with this email address.';
      } else {
        errorMsg = 'The password entered is incorrect. Please try again.';
      }

      await this.handleFailedAttempt('Wrong Credentials', errorMsg);
    }, 400);
  }

  private async handleFailedAttempt(title: string, message: string) {
    this.failedAttempts++;

    if (this.failedAttempts >= 3) {
      this.startLockout();
      await this.alertService.showAlert(
        'Security Cooldown Active',
        'Too many failed attempts. Login is disabled for 10 seconds.'
      );
      return;
    }

    await this.alertService.showAlert(title, message, [
      { text: 'Try Again', role: 'cancel' },
    ]);
  }

  private startLockout() {
    this.isLockedOut = true;
    this.lockoutSeconds = 10;

    if (this.lockoutTimer) {
      clearInterval(this.lockoutTimer);
    }

    this.lockoutTimer = setInterval(() => {
      this.lockoutSeconds--;

      if (this.lockoutSeconds <= 0) {
        this.clearLockout();
      }
    }, 1000);
  }

  private clearLockout() {
    if (this.lockoutTimer) {
      clearInterval(this.lockoutTimer);
      this.lockoutTimer = null;
    }
    this.isLockedOut = false;
    this.failedAttempts = 0;
    this.lockoutSeconds = 10;
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  ngOnDestroy() {
    if (this.lockoutTimer) {
      clearInterval(this.lockoutTimer);
    }
  }
}