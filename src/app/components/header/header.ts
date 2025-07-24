import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
 currentDateTime: string = '';
  employeeName: string = 'Mohamed Ahmed';
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);

    // 🔁 Load current language
    this.currentLang = localStorage.getItem('lang') || 'en';
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(this.currentLang === 'ar' ? 'ar-EG' : 'en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  toggleLang(): void {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', this.currentLang);
    this.translate.use(this.currentLang);
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
