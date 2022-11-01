import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetReportsComponent } from './balance-sheet-reports.component';

describe('BalanceSheetReportsComponent', () => {
  let component: BalanceSheetReportsComponent;
  let fixture: ComponentFixture<BalanceSheetReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSheetReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
