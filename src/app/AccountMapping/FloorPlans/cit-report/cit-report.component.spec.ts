import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitReportComponent } from './cit-report.component';

describe('CitReportComponent', () => {
  let component: CitReportComponent;
  let fixture: ComponentFixture<CitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
