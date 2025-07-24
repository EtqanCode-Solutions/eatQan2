import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  @Input() activePage: string = '';

  menuItems = [
    {
      title: 'sidebar.overview',
      icon: 'ri-dashboard-line',
      link: '/dashboard',
      hasSubmenu: false,
    },
    {
      title: 'sidebar.orders',
      icon: 'ri-shopping-bag-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.allOrders', link: '/orders' },
        { title: 'sidebar.pendingOrders', link: '/orders/pending' },
        { title: 'sidebar.completedOrders', link: '/orders/completed' },
      ],
    },
    {
      title: 'sidebar.menuManagement',
      icon: 'ri-restaurant-line',
      hasSubmenu: false, // ⬅️ ما فيش Submenu
      expanded: false, // ⬅️ مش ضروري بس خليه موجود
      link: '/dashboard/menu', // ⬅️ الرابط المباشر لصفحة المنيو
    },

    {
      title: 'sidebar.employees',
      icon: 'ri-group-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.allEmployees', link: '/employees' },
        { title: 'sidebar.addEmployee', link: '/employees/add' },
        { title: 'sidebar.rolesPermissions', link: '/employees/roles' },
      ],
    },
    {
      title: 'sidebar.customers',
      icon: 'ri-user-3-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.customerList', link: '/customers' },
        { title: 'sidebar.loyaltyProgram', link: '/customers/loyalty' },
      ],
    },
    {
      title: 'sidebar.inventory',
      icon: 'ri-archive-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.stockOverview', link: 'inventory' },
        { title: 'sidebar.addStock', link: 'inventory/add' },
        { title: 'sidebar.suppliers', link: 'inventory/suppliers' },
      ],
    },
    {
      title: 'sidebar.devices',
      icon: 'ri-cpu-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.posDevices', link: 'devices' },
        { title: 'sidebar.addDevice', link: 'devices/add' },
      ],
    },
    {
      title: 'sidebar.reports',
      icon: 'ri-bar-chart-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.salesReports', link: 'reports/sales' },
        { title: 'sidebar.inventoryReports', link: 'reports/inventory' },
        { title: 'sidebar.employeeReports', link: 'reports/employees' },
      ],
    },
    {
      title: 'sidebar.settings',
      icon: 'ri-settings-3-line',
      hasSubmenu: true,
      expanded: false,
      subItems: [
        { title: 'sidebar.generalSettings', link: 'settings/general' },
        { title: 'sidebar.taxFees', link: 'settings/tax' },
        { title: 'sidebar.printersettings', link: 'settings/printer-settings' },
        { title: 'sidebar.coupons', link: 'settings/coupons-discounts' },
      ],
    },
  ];

  toggleItem(item: any) {
    if (item.hasSubmenu) {
      this.menuItems.forEach((i) => {
        if (i !== item) i.expanded = false;
      });
      item.expanded = !item.expanded;
    }
  }
}
