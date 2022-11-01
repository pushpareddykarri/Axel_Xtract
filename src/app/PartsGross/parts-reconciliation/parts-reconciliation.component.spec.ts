import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsReconciliationComponent } from './parts-reconciliation.component';

describe('PartsReconciliationComponent', () => {
  let component: PartsReconciliationComponent;
  let fixture: ComponentFixture<PartsReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsReconciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
