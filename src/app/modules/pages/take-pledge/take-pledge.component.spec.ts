import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePledgeComponent } from './take-pledge.component';

describe('TakePledgeComponent', () => {
  let component: TakePledgeComponent;
  let fixture: ComponentFixture<TakePledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakePledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
