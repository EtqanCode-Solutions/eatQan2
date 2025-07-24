import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-printer-settings',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './printer-settings.html',
  styleUrls: ['./printer-settings.scss'],
})
export class PrinterSettings {
  showModal = false;
  editingIndex: number | null = null;
  showNetworkField = false;

  printers: any[] = [];

  form = {
    name: '',
    type: '',
    port: 'USB',
    language: 'AR',
    location: '',
    copies: 1,
    autoPrint: false,
    template: '',
    networkAddress: '', // ✅ ضروري عشان ngModel تشتغل
  };

  openModal() {
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingIndex = null;
  }

  onPortChange(portValue: string) {
    this.showNetworkField = portValue === 'NETWORK';
  }

  savePrinter() {
    const printerData = { ...this.form };
    if (this.editingIndex !== null) {
      this.printers[this.editingIndex] = printerData;
    } else {
      this.printers.push(printerData);
    }
    this.closeModal();
  }

  editPrinter(index: number) {
    this.editingIndex = index;
    this.form = { ...this.printers[index] };
    this.showNetworkField = this.form.port === 'NETWORK';
    this.showModal = true;
  }

  deletePrinter(index: number) {
    this.printers.splice(index, 1);
  }

  resetForm() {
    this.form = {
      name: '',
      type: '',
      port: 'USB',
      language: 'AR',
      location: '',
      copies: 1,
      autoPrint: false,
      template: '',
      networkAddress: '', // ✅ Reset
    };
    this.showNetworkField = false;
  }
}
