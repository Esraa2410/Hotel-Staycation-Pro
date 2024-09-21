import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpDateCommentComponent } from './components/room-details/components/up-date-comment/up-date-comment.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './modules/payment/payment.component';




@NgModule({
  declarations: [
    GuestComponent,
    UpDateCommentComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
  //  NgxStripeModule

  ]
})
export class GuestModule { }
