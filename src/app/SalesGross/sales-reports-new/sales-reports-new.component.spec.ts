import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportsNewComponent } from './sales-reports-new.component';

describe('SalesReportsNewComponent', () => {
  let component: SalesReportsNewComponent;
  let fixture: ComponentFixture<SalesReportsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReportsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
