import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { IBooking, IParams } from './models/ibooking';
import { BookingService } from './services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  btnText: string = 'Add new booking';
  headerText: string = 'Booking Table Details';
  headerPargraph: string = 'You can check all details';

  displayedColumns: string[] = [
    'Room number',
    'Price',
    'Start date',
    'End date',
    'Guest',
    'Actions',
  ];

  bookingData: IBooking[] = [];
  search!: string;
  pageSize = 10;
  pageIndex = 0;
  totalCount!: number;

  params: IParams = {
    page: this.pageIndex,
    size: this.pageSize,
  };

  sortedBookings: IBooking[] = [];

  constructor(
    private _BookingService: BookingService,
    private _Router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.sortedBookings = this.bookingData.slice();
  }

  ngOnInit(): void {
    this.getAllBookings();
  }
  sortData(sort: Sort) {
    const data = this.bookingData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedBookings = data;
      return;
    }

    this.sortedBookings = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price':
          return this.compare(a.totalPrice, b.totalPrice, isAsc);
        case 'Guest':
          return this.compareStrings(a.user.userName, b.user.userName, isAsc);
        case 'Start date':
          return this.compareDates(a.startDate, b.startDate, isAsc);
        case 'End date':
          return this.compareDates(a.endDate, b.endDate, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareStrings(a: string, b: string, isAsc: boolean) {
    return a.toLowerCase().localeCompare(b.toLowerCase()) * (isAsc ? 1 : -1);
  }

  compareDates(a: string, b: string, isAsc: boolean) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getAllBookings() {
    this._BookingService.getAllBookings(this.params).subscribe({
      next: (res: any) => {
        this.bookingData = res.data.booking;
        this.sortedBookings = this.bookingData.slice();
        this.totalCount = res.data.totalCount;
      }
    });
  }
  changePage(e: PageEvent) {
    this.params.page = e.pageIndex + 1;
    this.params.size = e.pageSize;
    this.getAllBookings();
  }

  resetSearchInput() {
    this.search = '';
    this.getAllBookings();
  }
  filtetByRoomNumber(searchValue: HTMLInputElement) {
    if (searchValue) {
      this.sortedBookings = this.sortedBookings.filter((p) =>
        p.room.roomNumber.includes(searchValue.value)
      );
      this.totalCount = this.sortedBookings.length;
    }
  }


  deleteThisItem(id: number, name: string): void {
    this.openDeleteDialog(id, name, 'Booking')
  }

  // DELETE_DIALOG
  openDeleteDialog(id: number, itname: string, componentName: string): void {
    const dialo = this.dialog.open(DeleteComponent, {
      width: '31.25rem',
      data: {
        comp: componentName,
        id: id,
        name: itname
      }
    });
    dialo.afterClosed().subscribe(res => {
      if (res != null) {
        this.deleteBooking(res)
      }
    })
  }
  // DELETE_FUNCTION
  deleteBooking(id: number) {
    this._BookingService.deleteBooking(id).subscribe({
      error: err => {
        this.toastr.error(err.error.message)
      },
      complete: () => {
        this.toastr.success("Deleted succefully");
        this.getAllBookings()
      }
    })
  }



}
