import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tax-fees-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tax.html',
  styleUrls: ['./tax.scss']
})
export class TaxFeesSettings {
  activeTab = 'tax';

  form = {
    isTaxEnabled: true,
    taxType: 'percentage',
    vatPercentage: 15,
    serviceFeePercentage: 10,
    fixedTaxAmount: 5,
    externalOrdersOnly: false,
    serviceFeeEnabled: true,
    serviceFeeType: 'fixed',
    serviceFeeValue: 5,
  };

  taxTypes = [
    { label: 'نسبة مئوية', value: 'percentage' },
    { label: 'قيمة ثابتة', value: 'fixed' },
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  save() {
    console.log('✅ Saved:', this.form);
  }
}
