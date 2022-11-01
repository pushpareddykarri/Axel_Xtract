import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMappingComponent } from './account-mapping.component';

describe('AccountMappingComponent', () => {
  let component: AccountMappingComponent;
  let fixture: ComponentFixture<AccountMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
