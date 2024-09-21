import { Component, OnInit } from '@angular/core';
import { AdsService } from './services/ads.service';
import { ToastrService } from 'ngx-toastr';
import { IParams, IRoom } from '../rooms/models/IRoom.model';
import { Ad, IAdsResponse } from './models/IAdsResponse';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { UpdateViewAdsComponent } from './components/update-view-ads/update-view-ads.component';
import { AddAdsPopupComponent } from './components/add-ads-popup/add-ads-popup.component';
import { RoomsService } from '../rooms/services/rooms.service';

export interface IAds {
  room?: string
  discount: number
  isActive: boolean
}
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  //for header
  btnText: string = 'Add new ads';
  headerText: string = 'Ads Table Details';
  headerPargraph: string = 'You can check all details';
  listOfFacilities: any;
  displayedColumns: string[] = ['Room number', 'Price', 'Discount', 'Capacity', 'Is active', 'Created by', 'Actions'];
  AdsDataRes: IAdsResponse = {
    success: false,
    message: '',
    data: {
      totalCount: 0,
      ads: []
    }
  }

  search!: string;
  pageSize = 10;
  pageIndex = 0;
  totalCount!: number;
  params: IParams = {
    page: this.pageIndex,
    size: this.pageSize
}
  sortedAds: Ad[] = [];
  roomData: IRoom[] = []

  constructor(private _AdsService: AdsService, private toastr: ToastrService, public dialog: MatDialog, private _RoomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.getAllAds();
    this.getAllRooms();
  }


  sortData(sort: Sort) {
    const data = this.AdsDataRes.data.ads.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAds = data;
      return;
    }
    this.sortedAds = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'discount':
          return this.compare(a.room.discount, b.room.discount, isAsc);
        case 'price':
          return this.compare(a.room.price, b.room.price, isAsc);
        case 'capacity':
          return this.compare(a.room.capacity, b.room.capacity, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



  getAllAds() {

    this._AdsService.getAllAds(this.params).subscribe({
      next: (res) => {
        this.AdsDataRes = res;
      },
      error: (err) => {
        this.toastr.error(err.error.message)
      },
      complete: () => {
        this.sortedAds = this.AdsDataRes.data.ads.slice();
        this.totalCount = this.AdsDataRes.data.totalCount;
      }
    })

  }
  //for paginaton 
  changePage(e: PageEvent) {
    this.params.page = e.pageIndex + 1;
    this.params.size = e.pageSize;
    this.getAllAds();
  }

  resetSearcgInput() {
    this.search = '';
    this.getAllAds();
  }
  filtetByRoomNumber(searchValue: HTMLInputElement) {
    if (searchValue) {
      this.sortedAds = this.sortedAds.filter(p => p.room.roomNumber.includes(searchValue.value));
      this.totalCount = this.sortedAds.length
    }
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
        this.deleteAds(res)
      }
    })
  }
  // DELETE_FUNCTION
  deleteAds(id: number) {
    this._AdsService.deleteAds(id).subscribe({
      error: err => {
        this.toastr.error(err.error.message)
      },
      complete: () => {
        this.toastr.success("Deleted succefully")
        this.getAllAds()
      }
    })
  }


  openUpdateViewDialog(adID: number, roomNum: string, isActiveUpdated: boolean, updatedDiscount: string, editType: boolean): void {
    const dialogRef = this.dialog.open(UpdateViewAdsComponent, {
      data: { id: adID, isActive: isActiveUpdated, discount: updatedDiscount, roomNumber: roomNum, isEdit: editType },
      width: '25%'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editType) {
          //edit Api
          this.updateAdsItem(adID, { isActive: result.isActive, discount: result.discount })
        } else {
          //view
          this.openDeleteDialog(adID, roomNum, 'Ads')
        }
      }
    });


  }

  updateAdsItem(id: number, data: IAds) {
    this._AdsService.updateADItem(id, data).subscribe({
      error: (err) => {
        this.toastr.error(err.error.message)
      }, complete: () => {
        this.toastr.success("Updated succefully")
        this.getAllAds();
      }
    });
  }



  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAdsPopupComponent, {
      data: { roomData: this.roomData, isActive: '', discount: '', room: '' },
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AddAdsItem({ room: result.room, discount: result.discount, isActive: result.isActive })
      }
    });
  }

  AddAdsItem(data: IAds) {
    this._AdsService.addADItem(data).subscribe({
      error: (err) => {
        this.toastr.error(err.error.message)
      }, complete: () => {
        this.toastr.success("Added succefully")
        this.getAllAds();
      }
    });
  }


  getAllRooms() {
    this._RoomsService.getAllRooms({ page: 1, size: 1000 }).subscribe({
      next: (res) => {
        this.roomData = res.data.rooms;
      }
    })
  }


}
