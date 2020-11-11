import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreationSummaryComponent } from './account-creation-summary.component';

describe('AccountCreationSummaryComponent', () => {
  let component: AccountCreationSummaryComponent;
  let fixture: ComponentFixture<AccountCreationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
