import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { VeiwBookingComponent } from './veiw-booking/veiw-booking.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
  { path: 'veiw/:id', component: VeiwBookingComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
