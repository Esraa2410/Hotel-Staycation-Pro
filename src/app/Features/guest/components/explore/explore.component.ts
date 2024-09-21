import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuestService } from '../../services/guest.service';
import { IParams, IRoomResponse } from 'src/app/Features/Manager/modules/rooms/models/IRoom.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { IFavoriteResponse } from '../favorite/models/IFavorite';
import { PageEvent } from '@angular/material/paginator';
import { AuthPopupComponent } from 'src/app/shared/components/auth-popup/auth-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { IExplorParms } from '../../models/IExplorParms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule ,SharedModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent  implements OnInit{


  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';
  roomsRes:IRoomResponse={
    success:false,
    message:'',
    data:{
      totalCount:0,
      rooms:[]
    }

  }
  fav!: IFavoriteResponse ;
  loginToFav: any = localStorage.getItem('role');
  totalCount!:number;
  page = 0;
  size = 10;
  startDate: string = '';
  endDate: string = '';
  capacity: number = 0;

  params:IExplorParms= {
    page :this.page,
    size:this.size

  }
  constructor(private translate:TranslateService ,
    private _GuestService:GuestService,
    private _ToastrService: ToastrService ,
    private _router: Router,private ActivRoute: ActivatedRoute,
    public dialog: MatDialog,){

  }



  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log(event)
      this.lang=event.lang
    });

    this.getParamsForExplor()
    if(this.startDate&&this.endDate&&this.capacity){
      this.params={
        page:0,
        size:10,
        startDate:this.startDate,
        endDate:this.endDate,
        capacity:this.capacity

      }
    }
    this.getAllRoomForExplore();
  }

  getParamsForExplor(){
    this.ActivRoute.queryParams.subscribe(params => {
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.capacity = params['capacity'];
      console.log('Start Date:', this.startDate);
      console.log('End Date:', this.endDate);
      console.log('Capacity:', this.capacity);
    });

  }

  getAllRoomForExplore() {
    this._GuestService.getAllRoomsForExplore(this.params).subscribe({
      next: (res) => {

        this.roomsRes = res;
        console.log(this.roomsRes);
        this.totalCount = res.data.totalCount;
        console.log(this.totalCount)

      },
      error: (err) => {
        console.log(err)


      }
    })
  }
  goLogin():void{

    this._ToastrService.error('Login first')

    this._router.navigate(['/auth'])

  }
  saveRoomInFav(roomId: string) {
    this._GuestService.saveFavRoom(roomId).subscribe({
      next: (res) => {
        this.fav = res;
        console.log(this.fav)
      },
      error: (err) => {
        console.log(err)
        this.showErrorToaster('room-is-already-in-your-favorite')


      },
      complete: () => {
        this.showSuccessToaster('room-added-to-favorites-successfully')

      }
    })
  }
     //for paginaton
     changePage(e: PageEvent) {
      this.params.page = e.pageIndex + 1;
      this.params.size = e.pageSize;
      this.getAllRoomForExplore();
    }
    openAuthDialog() {
      const dialogRef = this.dialog.open(AuthPopupComponent, {width: '31.25rem',});
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
}
