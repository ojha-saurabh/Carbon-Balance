import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateOptionsComponent } from './donate-options.component';

describe('DonateOptionsComponent', () => {
  let component: DonateOptionsComponent;
  let fixture: ComponentFixture<DonateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
