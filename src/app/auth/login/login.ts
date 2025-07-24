import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  currentLang: 'en' | 'ar' = 'en';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {
    // تهيئة نموذج تسجيل الدخول
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    // تحديد اللغة المحفوظة أو الافتراضية
    const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    this.setLanguage(savedLang);

    // ملء اسم المستخدم إن تم حفظه مسبقًا
    const rememberedUsername = localStorage.getItem('rememberedusername');
    if (rememberedUsername) {
      this.loginForm.patchValue({
        username: rememberedUsername,
        rememberMe: true,
      });
    }
  }

  /**
   * تبديل اللغة بين EN و AR
   */
  toggleLang(): void {
    const newLang: 'en' | 'ar' = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  /**
   * تفعيل اللغة وتحديث الواجهة
   */
  setLanguage(lang: 'en' | 'ar'): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  /**
   * إرسال بيانات تسجيل الدخول
   */
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;

    const { username, password, rememberMe } = this.loginForm.value;

    // حفظ اسم المستخدم إذا تم اختيار "تذكرني"
    if (rememberMe) {
      localStorage.setItem('rememberedusername', username);
    } else {
      localStorage.removeItem('rememberedusername');
    }

    // محاكاة تسجيل الدخول
    setTimeout(() => {
      console.log('Login success', { username, password, rememberMe });
      this.isSubmitting = false;
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
