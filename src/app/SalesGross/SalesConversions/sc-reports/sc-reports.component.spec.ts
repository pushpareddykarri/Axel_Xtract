import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScReportsComponent } from './sc-reports.component';

describe('ScReportsComponent', () => {
  let component: ScReportsComponent;
  let fixture: ComponentFixture<ScReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
