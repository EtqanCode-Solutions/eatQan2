import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MENU_ITEMS } from './menu-items';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent {
  // التبويب النشط
  activeTab: 'addCategory' | 'addItem' | 'viewAll' = 'addCategory';

  // تحميل البيانات الأولية
  categories: { name: string; image: string }[] = [...MENU_ITEMS.categories];
  items: { name: string; price: number; category: string }[] = [...MENU_ITEMS.items];

  // مدخلات الإضافة
  newCategoryName: string = '';
  newCategoryImage: string = '';
  newItem = { name: '', price: 0, category: '' };

  // الفئة المعروضة حاليًا
  selectedCategoryForView: string | null = null;

  // متغيرات المودال
  showConfirmModal = false;
  confirmTitle = '';
  confirmMessage = '';
  onConfirmCallback: ((confirmed: boolean) => void) | null = null;

  // إضافة فئة جديدة
  addCategory(): void {
    const name = this.newCategoryName.trim();
    const image = this.newCategoryImage.trim() || 'assets/images/default.jpg';

    if (name && !this.categories.find(cat => cat.name === name)) {
      this.categories.push({ name, image });
      this.newCategoryName = '';
      this.newCategoryImage = '';
    }
  }

  // إضافة عنصر جديد
  addItem(): void {
    const { name, price, category } = this.newItem;
    if (name.trim() && price > 0 && category) {
      this.items.push({ name: name.trim(), price, category });
      this.newItem = { name: '', price: 0, category: '' };
    }
  }

  // إرجاع العناصر الخاصة بفئة معينة
  getItemsByCategory(category: string) {
    return this.items.filter(item => item.category === category);
  }

  // تبديل عرض العناصر لفئة معينة
  toggleCategoryItems(category: string): void {
    this.selectedCategoryForView =
      this.selectedCategoryForView === category ? null : category;
  }

  // فتح مودال تأكيد لحذف عنصر
  askDeleteItem(item: any): void {
    this.confirmTitle = 'تأكيد حذف العنصر';
    this.confirmMessage = `هل أنت متأكد من حذف العنصر "${item.name}"؟`;
    this.showConfirmModal = true;
    this.onConfirmCallback = (confirmed: boolean) => {
      if (confirmed) {
        this.deleteItem(item);
      }
    };
  }

  // حذف عنصر معيّن
  deleteItem(item: any): void {
    this.items = this.items.filter(i => i !== item);
  }

  // فتح مودال تأكيد لحذف فئة
 askDeleteCategory(event: MouseEvent, category: string): void {
  event.stopPropagation(); // يمنع فتح العناصر عند الضغط على زر الحذف
  this.confirmTitle = 'تأكيد الحذف';
  this.confirmMessage = `هل أنت متأكد من حذف الفئة "${category}" وكل عناصرها؟`;
  this.showConfirmModal = true;
  this.onConfirmCallback = (confirmed: boolean) => {
    if (confirmed) {
      this.deleteCategory(category);
    }
  };
}


  // حذف الفئة والعناصر المرتبطة
  deleteCategory(categoryName: string): void {
    this.categories = this.categories.filter(c => c.name !== categoryName);
    this.items = this.items.filter(i => i.category !== categoryName);
    if (this.selectedCategoryForView === categoryName) {
      this.selectedCategoryForView = null;
    }
  }

  // تنفيذ التأكيد من المودال
  confirm(result: boolean): void {
    if (this.onConfirmCallback) {
      this.onConfirmCallback(result);
      this.onConfirmCallback = null;
    }
    this.showConfirmModal = false;
  }
}
