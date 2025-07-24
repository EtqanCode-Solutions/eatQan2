import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterSettings } from './printer-settings';

describe('PrinterSettings', () => {
  let component: PrinterSettings;
  let fixture: ComponentFixture<PrinterSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinterSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinterSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
