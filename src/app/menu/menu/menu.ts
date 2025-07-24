import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_DATA } from './menu-items';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent {
  tabs = ['All Items', 'Modifiers', 'Price Adjustments'] as const;
  activeTab: 'All Items' | 'Modifiers' | 'Price Adjustments' = 'All Items';

  menuData = MENU_DATA;
  selectedCategory: string | null = null;

  setTab(tab: typeof this.tabs[number]) {
    this.activeTab = tab;
    this.selectedCategory = null;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  resetFilter() {
    this.selectedCategory = null;
  }

  // ======================== Modifiers ========================
  modifierGroups: any[] = [
    {
      name: 'صلصات',
      required: false,
      minSelect: 0,
      maxSelect: 2,
      items: [
        { name: 'مايونيز', price: 3 },
        { name: 'كاتشب', price: 2 },
        { name: 'صوص سبايسي', price: 4 },
      ]
    }
  ];

  showGroupDialog = false;
  editingGroupIndex: number | null = null;

  groupForm = {
    name: '',
    minSelect: 0,
    maxSelect: 1,
    required: false,
    items: []
  };

  openAddModifierGroupDialog() {
    this.editingGroupIndex = null;
    this.resetGroupForm();
    this.showGroupDialog = true;
  }

  editModifierGroup(index: number) {
    const group = this.modifierGroups[index];
    this.groupForm = { ...group };
    this.editingGroupIndex = index;
    this.showGroupDialog = true;
  }

  saveGroup() {
    if (this.editingGroupIndex !== null) {
      this.modifierGroups[this.editingGroupIndex] = { ...this.groupForm };
    } else {
      this.modifierGroups.push({ ...this.groupForm });
    }
    this.closeGroupDialog();
  }

  closeGroupDialog() {
    this.showGroupDialog = false;
    this.editingGroupIndex = null;
    this.resetGroupForm();
  }

  resetGroupForm() {
    this.groupForm = {
      name: '',
      minSelect: 0,
      maxSelect: 1,
      required: false,
      items: []
    };
  }

  showItemDialog = false;
  currentGroupIndex: number | null = null;

  itemForm = {
    name: '',
    price: 0
  };

  openItemDialog(groupIndex: number) {
    this.currentGroupIndex = groupIndex;
    this.resetItemForm();
    this.showItemDialog = true;
  }

  saveItem() {
    if (this.currentGroupIndex === null) return;
    if (!this.itemForm.name || isNaN(this.itemForm.price)) return;

    this.modifierGroups[this.currentGroupIndex].items.push({ ...this.itemForm });
    this.closeItemDialog();
  }

  closeItemDialog() {
    this.showItemDialog = false;
    this.currentGroupIndex = null;
    this.resetItemForm();
  }

  resetItemForm() {
    this.itemForm = { name: '', price: 0 };
  }
  deleteModifierGroup(index: number) {
  this.showConfirm('هل أنت متأكد من حذف هذه المجموعة؟', () => {
    this.modifierGroups.splice(index, 1);
    this.closeConfirm();
  });
}


  editModifier(groupIndex: number, itemIndex: number) {
    const item = this.modifierGroups[groupIndex].items[itemIndex];
    const name = prompt('تعديل اسم الإضافة', item.name);
    const price = parseFloat(prompt('تعديل السعر', item.price.toString()) || '0');
    if (name && !isNaN(price)) {
      this.modifierGroups[groupIndex].items[itemIndex] = { name, price };
    }
  }

  deleteModifier(groupIndex: number, itemIndex: number) {
    this.showConfirm('هل تريد حذف هذا العنصر؟', () => {
      this.modifierGroups[groupIndex].items.splice(itemIndex, 1);
      this.closeConfirm();
    });
  }

  // ======================== Price Adjustments ========================
  priceRules: any[] = [];

  showPriceRuleDialog = false;
  editingPriceRuleIndex: number | null = null;

  priceRuleForm = {
    name: '',
    type: 'percentage',
    amount: 0,
    appliesTo: { type: 'all', value: '' },
    startDate: '',
    endDate: '',
    isActive: true
  };

  openPriceRuleDialog(index?: number) {
    if (index !== undefined) {
      this.editingPriceRuleIndex = index;
      this.priceRuleForm = { ...this.priceRules[index] };
    } else {
      this.editingPriceRuleIndex = null;
      this.priceRuleForm = {
        name: '',
        type: 'percentage',
        amount: 0,
        appliesTo: { type: 'all', value: '' },
        startDate: '',
        endDate: '',
        isActive: true
      };
    }
    this.showPriceRuleDialog = true;
  }

  savePriceRule() {
    if (this.editingPriceRuleIndex !== null) {
      this.priceRules[this.editingPriceRuleIndex] = { ...this.priceRuleForm };
    } else {
      this.priceRules.push({ ...this.priceRuleForm });
    }
    this.closePriceRuleDialog();
  }

  closePriceRuleDialog() {
    this.showPriceRuleDialog = false;
    this.editingPriceRuleIndex = null;
  }

  deletePriceRule(index: number) {
    this.showConfirm('هل تريد حذف هذه القاعدة؟', () => {
      this.priceRules.splice(index, 1);
      this.closeConfirm();
    });
  }

  togglePriceRule(index: number) {
    this.priceRules[index].isActive = !this.priceRules[index].isActive;
  }

  // ======================== Confirmation ========================
  confirmDialog = {
    show: false,
    message: '',
    onConfirm: () => {}
  };

  showConfirm(message: string, onConfirm: () => void) {
    this.confirmDialog = {
      show: true,
      message,
      onConfirm
    };
  }

  closeConfirm() {
    this.confirmDialog.show = false;
  }
}
