import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { UserModel } from 'src/app/models/user.model';
import { SecurityUtil } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public hide = true;
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private service: DataService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Authenticating...' });
    loading.present();

    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (res: UserModel) => {
          SecurityUtil.set(res);
          loading.dismiss();
          this.navCtrl.navigateRoot('/');
        },
        (err) => {
          this.showError('Invalid user or password');
          loading.dismiss();
        });
  }

  async resetPassword() {
    if (this.form.controls['username'].invalid) {
      this.showError('Invalid User');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Reseting your password...' });
    loading.present();
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async showError(message) {
    const error = await this.toastCtrl.create({ message: message, showCloseButton: true, closeButtonText: 'Close', duration: 3000 });
    error.present();
  }
}
