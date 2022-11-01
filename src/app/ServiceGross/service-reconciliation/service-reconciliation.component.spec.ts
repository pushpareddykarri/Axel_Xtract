import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReconciliationComponent } from './service-reconciliation.component';

describe('ServiceReconciliationComponent', () => {
  let component: ServiceReconciliationComponent;
  let fixture: ComponentFixture<ServiceReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReconciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
