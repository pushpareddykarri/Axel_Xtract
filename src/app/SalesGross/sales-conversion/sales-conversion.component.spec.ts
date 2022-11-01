import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesConversionComponent } from './sales-conversion.component';

describe('SalesConversionComponent', () => {
  let component: SalesConversionComponent;
  let fixture: ComponentFixture<SalesConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
