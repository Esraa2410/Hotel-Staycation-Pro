
import {
  IRommCommentResponse, IRoomReveiwResponse, IDeleteCommentResponse,
  IRommCommentData, IRoomReviewData, IRoomComment, RoomReview
} from './../../models/room-details';
import { Component, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoomDetailsService } from '../../services/room-details.service';
import { ToastrService } from 'ngx-toastr';
import { StarRatingModule, StarRatingConfigService } from 'angular-star-rating';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UpDateCommentComponent } from './components/up-date-comment/up-date-comment.component';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GuestService } from '../../services/guest.service';
import { IBookingResponse, ICreateBooking } from '../../models/IBookingResponse';
import { format } from 'date-fns';
import { AuthPopupComponent } from 'src/app/shared/components/auth-popup/auth-popup.component';
import { BookingService } from '../../services/Booking.service';


@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [StarRatingModule, MatButtonModule, MatDialogModule,
    CommonModule, CarouselModule, MatCardModule, MatNativeDateModule, MatFormFieldModule,
    MatDatepickerModule, SharedModule, MatExpansionModule, MatIconModule, MatButtonModule, MatInputModule],
  providers: [StarRatingConfigService],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss',]
})
export class RoomDetailsComponent {

  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  roomRes: any;
  rating: number = 0;
  commentsResponse!: IRommCommentData;
  reviewsResponse!: IRoomReviewData
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  id: string = '';
  reviewForm!: FormGroup;
  commentForm!: FormGroup;
  numberOfNights:number=0

  loginIn: any = localStorage.getItem('role');

  deletRes: IDeleteCommentResponse = {
    success: false,
    message: ''
  };

  bookingResp:IBookingResponse={
    success:false,
    message:'',
    data:{
      booking:{
    startDate: '',
    endDate: '',
    totalPrice: 0,
    user: '',
    room: '',
    status: '',
    _id: '',
      }
    }
  }

  RoomComment: IRoomComment[] = [];
  roomReviews: RoomReview[] = [];
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';

  campaignOne: FormGroup;

  constructor(public dialog: MatDialog, private _ActivatedRoute: ActivatedRoute, private _HttpClient: HttpClient,
    private _RoomDetailsService: RoomDetailsService, private _ToastrService: ToastrService, private translate: TranslateService,
  private _BookingService:BookingService,private _Router:Router,private fb: FormBuilder
) {
    this.campaignOne = this.fb.group({
      start: [],
      end: [],
    });
  }

  userId: any ;
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    this.id = this._ActivatedRoute.snapshot.params['id']
    this.getRoomById(this.id);
    this.getAllRoomComments(this.id);
    this.getAllRoomReviews(this.id);
    this.reviewForm = new FormGroup({
      roomId: new FormControl(this.id, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      review: new FormControl(null, [Validators.required]),
    });

    this.commentForm = new FormGroup({
      roomId: new FormControl(this.id, [Validators.required]),
      comment: new FormControl(null, [Validators.required])
    })
  }


  onAddReview(reviewForm: FormGroup) {
    if(this.loginIn==null){

      this.openAuthDialog()
    }else{

    this._RoomDetailsService.AddRoomreview(reviewForm.value).subscribe({
      next: (res: IRoomReveiwResponse) => {
        // console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        //  console.log(err);
        // this._ToastrService.error(err.error.message);
        this.showErrorToaster('review-add-error');
        this.reviewForm.reset();
      },
      complete: () => {
        // this._ToastrService.success('Your Review Added Successfuly ');
        this.showSuccessToaster('review-add-success');
        this.reviewForm.reset();
        this.getAllRoomReviews(this.id);
      }
    })
  }
  }


  onAddComment(commentForm: FormGroup) {

    if(this.loginIn==null){

      this.openAuthDialog()
    }else{

    this._RoomDetailsService.AddRoomComment(commentForm).subscribe({
      next: (res: IRommCommentResponse) => {
        // console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        //console.log(err);
        // this._ToastrService.error(err.error.message);

        this.showErrorToaster('comment-add-error');
        this.reviewForm.reset();
      },
      complete: () => {
        // this._ToastrService.success('Your Comment Added Successfuly ');
        this.showSuccessToaster('commment-add-success');
        this.commentForm.reset();
        this.getAllRoomComments(this.id);
      }
    })
  }
  }

  sliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  getRoomById(id: string) {
    this._RoomDetailsService.getRoomById(id).subscribe({
      next: (res: any) => {
        this.roomRes = res.data.room
        //console.log(this.roomRes);
      },
      error: (err: HttpErrorResponse) => {
        // console.log(err);
      }
    })
  }

  getDiscountedPrice(price: number, discount: number): number {
    return (price - discount) ;
  }

  getAllRoomComments(id: string) {
    this._RoomDetailsService.getAllRoomComments(id).subscribe({
      next: (res) => {
        this.commentsResponse = res.data;
        // console.log(this.commentsResponse);
        this.RoomComment = res.data.roomComments
        // console.log(this.RoomComment);
      }
    })
  }

  getAllRoomReviews(id: string) {
    this._RoomDetailsService.getAllRoomReviews(id).subscribe({
      next: (res) => {
        this.reviewsResponse = res.data;
        // console.log(this.reviewsResponse);
        this.roomReviews = res.data.roomReviews;
        // console.log(this.roomReviews)
      }
    })
  }

  updateComment(id: string, comment: string) {
    const dialogRef = this.dialog.open(UpDateCommentComponent, {
      width: '600px',
      height: '300px',
      data: { id: id, comment: comment },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.getAllRoomComments(this.id);
    });

  }

  deleteComment(commentId: string, commentData: string): void {
    this.openDeleteDialog('700ms', '350ms', commentId, commentData, 'Comment')
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string, itname: string, componentName: string): void {
    const dialo = this.dialog.open(DeleteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        comp: componentName,
        id: id,
        name: itname
      }
    });
    dialo.afterClosed().subscribe(res => {
      if (res != null) {
        this.onDeleteComment(id, this.id)
      }
    })
  }

  onDeleteComment(commentId: string, roomId: string) {
    this._RoomDetailsService.deletComment(commentId, roomId).subscribe({
      next: (res) => {
        //  console.log(res);
        this.deletRes = res;
      }, error: (err: HttpErrorResponse) => {
        // console.log(err);
        // this._ToastrService.error(err.error.message)
        this.showErrorToaster('comment-delete-error');
      }, complete: () => {
        this._ToastrService.success(this.deletRes.message);
        this.showSuccessToaster('enter-start-end-date-and-capacity');
        this.getAllRoomComments(this.id);
      }
    })
  }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthPopupComponent, { width: '31.25rem' });
  }

  createBooking(price:number):void{
    if(this.loginIn==null){

this.openAuthDialog()
    }else{
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;


    if (startDate && endDate && price &&this.id ) {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

      console.log('Start Date:', formattedStartDate);
      console.log('End Date:', formattedStartDate);
      this.calculateDays(formattedStartDate,formattedEndDate)
      this.booking({room:this.id,startDate:formattedStartDate,endDate:formattedEndDate,totalPrice:price*this.numberOfNights})

    }else{

      this.showErrorToaster('enter-start-end-date-and-capacity')
    }

  }

  }
   booking(data:ICreateBooking):void{
    this._BookingService.createBooking(data).subscribe({
      next: (res) => {
        //  console.log(res);
        this.bookingResp = res;
      }, error: (err: HttpErrorResponse) => {
        // this._ToastrService.error(err.error.message)
        this.showErrorToaster('booking-error');
      }, complete: () => {
        this.showSuccessToaster('booking-created-successfully');


        this._Router.navigate(['/guest/payment',this.bookingResp.data.booking._id])

      }
    })
   }

   calculateDays(startDateStr: string, endDateStr: string): void {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the time difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

     console.log(daysDifference);
     this.numberOfNights=daysDifference
  }


  showSuccessToaster(toastEnAr:string) {
    this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
      this._ToastrService.success(res);
    });
  }

  showErrorToaster(toastEnAr:string) {
    this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
      this._ToastrService.error(res);
    });
  }


  showAuthDiaLogoutUser():void{
    if(this.loginIn==null){
    this.openAuthDialog()

    }
  }


  preventExpansion(event: Event) {
    if (this.loginIn == null) {
      event.stopPropagation();
      this.openAuthDialog();
    }
  }

}


