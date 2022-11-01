import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitFloorplanComponent } from './cit-floorplan.component';

describe('CitFloorplanComponent', () => {
  let component: CitFloorplanComponent;
  let fixture: ComponentFixture<CitFloorplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitFloorplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitFloorplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
