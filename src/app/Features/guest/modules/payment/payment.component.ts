
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';

import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { BookingService } from '../../services/Booking.service';
import { IBookingDetailsRes } from '../../models/IBookingResponse';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import {
  StripeCardComponent,
  StripeCardNumberComponent,
  StripeCardExpiryComponent,
  StripeCardCvcComponent,
  injectStripe,
  StripeService
} from 'ngx-stripe'
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  StripePublicKey:string='pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8'
 
  id:string=''

  bookingResp:IBookingDetailsRes={
    success:false,
    message:'',
    data:{
      booking:{
    startDate: '',
    endDate: '',
    totalPrice: 0,
    user: {
      _id:'',
      userName:"",
    },
    room: {
      _id:'',
      roomNumber:''
    },
    status: '',
    _id: '',
    
      }
    }
  }
  yourOwnAPI: any;
  stripeTest: any;
  card: any;
  isBookingDone:boolean = false
  constructor(
     private _formBuilder: FormBuilder ,  
     private _ActivatedRoute: ActivatedRoute ,
     private _BookingService:BookingService,
     private _ToastrService:ToastrService,
     private stripeService: StripeService) {}

     PaymentFormGroup = this._formBuilder.group({
      cardNumber: ['', Validators.required],
    });


  ngOnInit(): void {
   
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.getBookingById(this.id);

  }


  getBookingById(id:string):void{

    this._BookingService.getBookingById(id).subscribe({
      next: (res) => {
          console.log(res);
        this.bookingResp = res;
      }, error: (err) => {
        this._ToastrService.error(err.error.message)
      }, complete: () => {

      }
    })

  }


 







  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  checkoutForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  stripe = injectStripe(this.StripePublicKey);
  token:string='';


  createTokenThenPay() {
    console.log('createeeeeeee')
    const name = ('yasmin');
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.token=result.token.id
          console.log(this.token)
          this.pay(this.token)
        } else if (result.error) {
          // Error creating the token
          console.log('errrrrrrrrrrrrrrrr')

        }
      });
  }
  

  pay(token:string):void{

    this._BookingService.payBooking(this.id,token).subscribe({
      next: (res) => {
          console.log(res);
        this.isBookingDone = res.success;
        this._ToastrService.success('Your Booking has Completed sucessfully  click done to finish')
      }, error: (err) => {
        this._ToastrService.error(err.error.message)
      }, complete: () => {

      }
    })

  }

 

}