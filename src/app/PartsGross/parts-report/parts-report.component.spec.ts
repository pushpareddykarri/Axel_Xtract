import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsReportComponent } from './parts-report.component';

describe('PartsReportComponent', () => {
  let component: PartsReportComponent;
  let fixture: ComponentFixture<PartsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
