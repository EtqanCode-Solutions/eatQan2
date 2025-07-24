import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupounsDiscounts } from './coupons-discounts';

describe('CoupounsDiscounts', () => {
  let component: CoupounsDiscounts;
  let fixture: ComponentFixture<CoupounsDiscounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoupounsDiscounts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupounsDiscounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
