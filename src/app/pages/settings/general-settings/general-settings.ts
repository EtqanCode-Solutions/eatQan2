import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-settings.html',
  styleUrls: ['./general-settings.scss'],
})
export class GeneralSettings {
  form = {
    language: '',
    currency: '',
    timezone: '',
    dateFormat: '',
    timeFormat: '',
    darkMode: false,
    enablePrinters: false,
    enableDiscounts: false,
    allowEditAfterPayment: false,
    sessionTimeout: 0,
    orderDelayLimit: 0,
    showCountdown: false,
    showCashierName: false,
    showQRCodeOnInvoice: false,
    fullScreenMode: false,
  };

  // القيم المرجعية لكل حقل
  languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  currencies = ['EGP', 'SAR', 'USD', 'EUR'];

  timezones = [
    { value: 'UTC+2', label: 'UTC+2 (مصر)' },
    { value: 'UTC+3', label: 'UTC+3 (السعودية)' },
    { value: 'UTC+4', label: 'UTC+4 (الإمارات)' },
  ];

  dateFormats = [
    { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    { value: 'MM/dd/yyyy', label: 'MM/dd/yyyy' },
  ];

  timeFormats = [
    { value: '24', label: '24 ساعة' },
    { value: '12', label: '12 ساعة' },
  ];

  constructor() {
    // Initial load from backend or default values
    this.loadInitialSettings();
  }

  loadInitialSettings() {
    // مثال على تحميل القيم - ممكن تتغير حسب الباك اند
    this.form = {
      language: 'ar',
      currency: 'EGP',
      timezone: 'UTC+3',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: '24',
      darkMode: false,
      enablePrinters: true,
      enableDiscounts: false,
      allowEditAfterPayment: false,
      sessionTimeout: 30,
      orderDelayLimit: 15,
      showCountdown: true,
      showCashierName: true,
      showQRCodeOnInvoice: false,
      fullScreenMode: true,
    };
  }

  saveSettings() {
    console.log('✅ Saved Settings:', this.form);
    // TODO: Send to backend API
  }
}
