import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwBookingComponent } from './veiw-booking.component';

describe('VeiwBookingComponent', () => {
  let component: VeiwBookingComponent;
  let fixture: ComponentFixture<VeiwBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwBookingComponent]
    });
    fixture = TestBed.createComponent(VeiwBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
