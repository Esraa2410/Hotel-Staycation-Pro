import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { VeiwBookingComponent } from './veiw-booking/veiw-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BookingComponent,
    VeiwBookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ]
})
export class BookingModule { }
