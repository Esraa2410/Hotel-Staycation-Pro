import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassPopupComponent } from './change-pass-popup.component';

describe('ChangePassPopupComponent', () => {
  let component: ChangePassPopupComponent;
  let fixture: ComponentFixture<ChangePassPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassPopupComponent]
    });
    fixture = TestBed.createComponent(ChangePassPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
