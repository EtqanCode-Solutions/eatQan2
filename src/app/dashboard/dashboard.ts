import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterOutlet ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
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
}
