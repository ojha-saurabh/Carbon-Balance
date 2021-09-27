import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionableTipsComponent } from './actionable-tips.component';

describe('ActionableTipsComponent', () => {
  let component: ActionableTipsComponent;
  let fixture: ComponentFixture<ActionableTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionableTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionableTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
