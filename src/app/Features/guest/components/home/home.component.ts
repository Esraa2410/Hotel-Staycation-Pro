import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import { IAdsResponse } from 'src/app/Features/Manager/modules/ads/models/IAdsResponse';
import { ToastrService } from 'ngx-toastr';
import { IFavoriteResponse } from '../favorite/models/IFavorite';
import { Router } from '@angular/router';
import { IRoomResponse } from 'src/app/Features/Manager/modules/rooms/models/IRoom.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { format } from 'date-fns';
import { AuthPopupComponent } from 'src/app/shared/components/auth-popup/auth-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    MatCardModule, MatDatepickerModule, SharedModule, CarouselModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  stars = new Array(5);
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  userAds: IAdsResponse = {
    success: false,
    message: '',
    data: {
      totalCount: 0,
      ads: [],
    },
  };

  roomsRes: IRoomResponse = {
    success: false,
    message: '',
    data: {
      totalCount: 0,
      rooms: [],
    },
  };

  fav!: IFavoriteResponse;
  roomsOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: [
      '<i class="fa-solid fa-caret-left"></i>',
      '<i class="fa-solid fa-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  adsOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: [
      '<i class="fa-solid fa-caret-left"></i>',
      '<i class="fa-solid fa-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: [
      '<i class="fa-solid fa-caret-left"></i>',
      '<i class="fa-solid fa-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  campaignOne: FormGroup;

  constructor(public dialog: MatDialog, private _GuestService: GuestService, private _ToastrService: ToastrService,
    private _router: Router, private translate: TranslateService, private fb: FormBuilder) {
    this.campaignOne = this.fb.group({
      start: [],
      end: [],
    });
  }

  ngOnInit(): void {
    this.getAllAds();
    this.getAllRooms({});
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  capacity: number = 0; // Initial value
  loginToFav: any = localStorage.getItem('role');
  incrementValue() {
    this.capacity++;
  }

  decrementValue() {
    if (this.capacity > 0) {
      this.capacity--;
    }
  }

  lang: string =
    localStorage.getItem('lang') !== null
      ? localStorage.getItem('lang')!
      : 'en';

  explore(): void {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    if (startDate && endDate && this.capacity) {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
      this._router.navigate(['/guest/explore'], {
        queryParams: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          capacity: this.capacity,
        },
      });
    } else {
      this.showErrorToaster('enter-start-end-date-and-capacity')
    }
  }


  getAllAds() {
    this._GuestService.getAllAds().subscribe({
      next: (res) => {
        this.userAds = res;
      },
    });
  }

  getAllRooms(data: any) {
    this._GuestService.getAllRooms(data).subscribe({
      next: (res) => {
        this.roomsRes = res;
      }
    });
  }

  saveRoomInFav(roomId: string) {
    this._GuestService.saveFavRoom(roomId).subscribe({
      next: (res) => {
        this.fav = res;
      },
      error: (err) => {
        this.showErrorToaster('room-is-already-in-your-favorite')
      },
      complete: () => {
        this.showSuccessToaster('room-added-to-favorites-successfully')
      },
    });
  }

  openFaverioteRooms() {
    this._router.navigate(['guest/favorite']);
  }

  goLogin(): void {
    this._ToastrService.error('login-first');
    this._router.navigate(['/auth']);
  }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthPopupComponent, { width: '31.25rem' });
  }



  showSuccessToaster(toastEnAr: string) {
    this.translate.get('toaster.' + toastEnAr).subscribe((res: string) => {
      this._ToastrService.success(res);
    });
  }

  showErrorToaster(toastEnAr: string) {
    this.translate.get('toaster.' + toastEnAr).subscribe((res: string) => {
      this._ToastrService.error(res);
    });
  }


}
