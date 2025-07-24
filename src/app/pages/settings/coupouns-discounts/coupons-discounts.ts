import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coupons-discounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupons-discounts.html',
  styleUrl: './coupons-discounts.scss',
})
export class CoupounsDiscounts {
  activeTab: 'coupon' | 'direct' = 'coupon';

  couponFormModel = {
    code: '',
    discount: null,
    expiryDate: '',
  };

  directDiscount = {
    value: null,
  };

  saveCoupon() {
    console.log('✅ كوبون محفوظ:', this.couponFormModel);
    alert('تم حفظ الكوبون بنجاح ✅');
  }

  saveDirectDiscount() {
    console.log('✅ خصم مباشر محفوظ:', this.directDiscount);
    alert('تم تطبيق الخصم المباشر ✅');
  }
}
