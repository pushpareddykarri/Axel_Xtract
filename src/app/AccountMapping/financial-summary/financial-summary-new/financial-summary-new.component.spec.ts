import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSummaryNewComponent } from './financial-summary-new.component';

describe('FinancialSummaryNewComponent', () => {
  let component: FinancialSummaryNewComponent;
  let fixture: ComponentFixture<FinancialSummaryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialSummaryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialSummaryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
