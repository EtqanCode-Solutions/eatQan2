import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header';
import { RouterOutlet } from '@angular/router';
import { MENU_ITEMS } from '../menu/menu/menu-items';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

interface Category {
  name: string;
  image?: string;
}

interface Item {
  name: string;
  price: number;
  category: string;
  sold?: number;
  profit?: number;
  loss?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterOutlet, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  categories: Category[] = MENU_ITEMS.categories;
  items: Item[] = MENU_ITEMS.items;

  salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات (بالآلاف)',
        data: [120, 90, 150, 80, 170, 200],
        backgroundColor: '#007bff',
      }
    ]
  };

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  get allItems(): Item[] {
    return this.categories.flatMap((cat: Category) =>
      this.items.filter((item: Item) => item.category === cat.name)
    );
  }

  getMostExpensiveItem(): Item {
    return this.allItems.reduce((max: Item, item: Item) =>
      item.price > max.price ? item : max, this.allItems[0]);
  }

  getCheapestItem(): Item {
    return this.allItems.reduce((min: Item, item: Item) =>
      item.price < min.price ? item : min, this.allItems[0]);
  }

  getTopSellingItems(): Item[] {
    return this.allItems
      .filter(item => item.sold)
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 3);
  }

  get totalProfit(): number {
    return this.allItems.reduce((sum, item) => sum + (item.profit || 0), 0);
  }

  get totalLoss(): number {
    return this.allItems.reduce((sum, item) => sum + (item.loss || 0), 0);
  }
}
