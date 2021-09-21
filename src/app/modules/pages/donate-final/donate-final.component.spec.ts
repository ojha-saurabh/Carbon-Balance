import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateFinalComponent } from './donate-final.component';

describe('DonateFinalComponent', () => {
  let component: DonateFinalComponent;
  let fixture: ComponentFixture<DonateFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
