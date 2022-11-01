import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNew2Component } from './dashboard-new2.component';

describe('DashboardNew2Component', () => {
  let component: DashboardNew2Component;
  let fixture: ComponentFixture<DashboardNew2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNew2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNew2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
