import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeViewFacilitiesComponent } from './add-edite-view-facilities.component';

describe('AddEditeViewFacilitiesComponent', () => {
  let component: AddEditeViewFacilitiesComponent;
  let fixture: ComponentFixture<AddEditeViewFacilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditeViewFacilitiesComponent]
    });
    fixture = TestBed.createComponent(AddEditeViewFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
