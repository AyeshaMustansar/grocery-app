import { Injectable } from '@angular/core';
import { AlertController, AlertButton } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async showAlert(
    header: string,
    message: string,
    buttons: (string | AlertButton)[] = ['OK']
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();
  }
}
