import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBillingComponent } from './admin-billing.component';

describe('AdminBillingComponent', () => {
  let component: AdminBillingComponent;
  let fixture: ComponentFixture<AdminBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
