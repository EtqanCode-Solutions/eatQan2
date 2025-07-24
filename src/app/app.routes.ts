import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { TaxFeesSettings } from './pages/settings/tax/tax';
import { DashboardComponent } from './dashboard/dashboard';
import { CoupounsDiscounts } from './pages/settings/coupouns-discounts/coupons-discounts';
import { PrinterSettings } from './pages/settings/printer-settings/printer-settings';
import { GeneralSettings } from './pages/settings/general-settings/general-settings';
import { MenuComponent } from './menu/menu/menu';



export const routes: Routes = [
  // Redirect root to login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login route (outside layout)
  {
    path: 'login',
    component: LoginComponent,
  },

  // Dashboard layout and its children
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'settings/tax',
        component: TaxFeesSettings,
      },
        {
        path: 'settings/printer-settings',
        component: PrinterSettings,
      },
       {
        path: 'settings/coupons-discounts',
        component: CoupounsDiscounts,
      },
        {
        path: 'settings/general',
        component: GeneralSettings,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      // Add more child routes here if needed
    ],
  },

  // Wildcard: redirect any unknown routes to login
  {
    path: '**',
    redirectTo: 'login',
  },
];
