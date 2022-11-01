import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReconciliationComponent } from './sales-reconciliation.component';

describe('SalesReconciliationComponent', () => {
  let component: SalesReconciliationComponent;
  let fixture: ComponentFixture<SalesReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReconciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
