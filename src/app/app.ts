import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eatQan');

  constructor(private translate: TranslateService) {
  const lang = localStorage.getItem('lang') || 'en';
  this.translate.setDefaultLang(lang);
  this.translate.use(lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

}
