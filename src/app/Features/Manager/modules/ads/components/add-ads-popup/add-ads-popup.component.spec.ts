import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdsPopupComponent } from './add-ads-popup.component';

describe('AddAdsPopupComponent', () => {
  let component: AddAdsPopupComponent;
  let fixture: ComponentFixture<AddAdsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdsPopupComponent]
    });
    fixture = TestBed.createComponent(AddAdsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
