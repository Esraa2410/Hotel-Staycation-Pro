import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViewAdsComponent } from './update-view-ads.component';

describe('UpdateViewAdsComponent', () => {
  let component: UpdateViewAdsComponent;
  let fixture: ComponentFixture<UpdateViewAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateViewAdsComponent]
    });
    fixture = TestBed.createComponent(UpdateViewAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
