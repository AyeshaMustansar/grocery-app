import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  eyeOffOutline,
  eyeOutline,
  closeOutline,
  checkmarkCircle,
  closeCircle,
  mailOutline,
  refreshOutline,
  arrowForwardOutline,
  shieldCheckmarkOutline,
  alertCircleOutline,
  sparklesOutline,
  keyOutline,
  checkmarkDoneOutline,
  flashOutline,
  leafOutline,
  cartOutline,
  bagCheckOutline,
  storefrontOutline,
  starOutline,
  happyOutline,
  lockClosedOutline,
  lockOpenOutline,
  timeOutline,
  warningOutline,
  shieldOutline,
  checkmarkOutline
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
  savedEmail: string = 'chomoi594@gmail.com';
  savedPassword: string = 'thank';

  // User input fields
  email: string = '';
  password: string = '';

  // Password visibility state
  showPassword: boolean = false;

  // Form State
  isLoading: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  //  3-Attempt Lockout Mechanism
  failedAttempts: number = 0;
  isLockedOut: boolean = false;
  lockoutSeconds: number = 10;
  lockoutCompleted: boolean = false;
  private lockoutTimer: any = null;

  // Alert Modal State
  showAlert: boolean = false;
  isClosing: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertTitle: string = '';
  alertMessage: string = '';
  alertDetail: string = '';

  constructor(private router: Router) {
    addIcons({
      'eye-off-outline': eyeOffOutline,
      'eye-outline': eyeOutline,
      'close-outline': closeOutline,
      'checkmark-circle': checkmarkCircle,
      'close-circle': closeCircle,
      'mail-outline': mailOutline,
      'refresh-outline': refreshOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'alert-circle-outline': alertCircleOutline,
      'sparkles-outline': sparklesOutline,
      'key-outline': keyOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'flash-outline': flashOutline,
      'leaf-outline': leafOutline,
      'cart-outline': cartOutline,
      'bag-check-outline': bagCheckOutline,
      'storefront-outline': storefrontOutline,
      'star-outline': starOutline,
      'happy-outline': happyOutline,
      'lock-closed-outline': lockClosedOutline,
      'lock-open-outline': lockOpenOutline,
      'time-outline': timeOutline,
      'warning-outline': warningOutline,
      'shield-outline': shieldOutline,
      'checkmark-outline': checkmarkOutline,
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

    // Simulate authenticating for ultra-smooth interactive feel
    setTimeout(() => {
      this.isLoading = false;

      if (!trimmedEmail || !trimmedPassword) {
        this.emailError = !trimmedEmail;
        this.passwordError = !trimmedPassword;
        this.handleFailedAttempt('Credentials Required', 'Please enter both your email and password to continue.');
        return;
      }

      const isEmailCorrect = trimmedEmail.toLowerCase() === this.savedEmail.toLowerCase();
      const isPasswordCorrect = trimmedPassword === this.savedPassword;

      if (isEmailCorrect && isPasswordCorrect) {
        // Success: Reset failed attempts
        this.failedAttempts = 0;
        this.lockoutCompleted = false;
        this.emailError = false;
        this.passwordError = false;
        this.alertType = 'success';
        this.alertTitle = 'Login Successful!';
        this.alertMessage = 'Welcome back! Your fresh market cart and offers are ready.';
        this.alertDetail = this.savedEmail;
        this.openAlert();
      } else {
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

        this.handleFailedAttempt('Wrong Credentials', errorMsg);
      }
    }, 400);
  }

  private handleFailedAttempt(title: string, message: string) {
    this.failedAttempts++;

    if (this.failedAttempts >= 3) {
      //  3 attempts reached: Lockout for 10 seconds
      this.startLockout();
      this.alertType = 'error';
      this.alertTitle = 'Security Cooldown Active';
      this.alertMessage = 'Too many failed attempts. For your account protection, login is disabled for 10 seconds.';
      this.alertDetail = 'Temporary Security Lock';
      this.openAlert();
    } else {
      // Normal error: clean message with NO attempt count numbers
      this.lockoutCompleted = false;
      this.alertType = 'error';
      this.alertTitle = title;
      this.alertMessage = message;
      this.alertDetail = 'Please check your information';
      this.openAlert();
    }
  }

  private startLockout() {
    this.isLockedOut = true;
    this.lockoutCompleted = false;
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
    this.lockoutCompleted = true;

    if (this.showAlert && this.alertType === 'error') {
      this.alertTitle = 'Security Lock Lifted';
      this.alertMessage = 'Cooldown period is complete. The login button is now re-enabled.';
      this.alertDetail = 'System Ready';
    }
  }

  private openAlert() {
    this.isClosing = false;
    this.showAlert = true;
  }

  closeAlert() {
    this.isClosing = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isClosing = false;
      this.lockoutCompleted = false;
    }, 250);
  }

  proceedToHome() {
    this.showAlert = false;
    this.router.navigate(['/home-screen']);
  }

  tryAgain() {
    if (this.isLockedOut) return;
    this.closeAlert();
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