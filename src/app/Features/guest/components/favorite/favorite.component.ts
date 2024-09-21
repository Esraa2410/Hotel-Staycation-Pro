import { IAllFavRes, IAllFavResData, IRoom, IFavoriteRoom, IDeleteFavResRoom, IDeleteFavResData, IUser, IDeleteFavRes } from './models/IFavorite';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './services/favorite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  totalCount!: number;
  room: IRoom[] = [];
  user: IUser = {
    _id: '',
    userName: ''
  }
  favRoom: IFavoriteRoom[] = [];
  imags: string[] = [];
  facilitis: string[] = [];
  data: IAllFavResData = {
    favoriteRooms: this.favRoom,
    totalCount: 0
  }
  favList: IAllFavRes = {
    success: false,
    message: '',
    data: this.data
  }
  rooms: string[] = [];
  iDeleteFavResRoom: IDeleteFavResRoom = {
    _id: '',
    rooms: this.rooms,
    user: '',
    createdAt: '',
    updatedAt: ''
  }
  iDeleteFavResData: IDeleteFavResData = {
    favoriteRoom: this.iDeleteFavResRoom
  }
  deletRes: IDeleteFavRes = {
    success: false,
    message: '',
    data: this.iDeleteFavResData
  }

  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';
  loginToFav: any = localStorage.getItem('role');
  constructor(public dialog: MatDialog, private _Router: Router, private translate: TranslateService,
    private _ToastrService: ToastrService, private _FavoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      //  console.log(event)
      this.lang = event.lang;
    });
    this.getAllFav();
  }

  getAllFav() {
    this._FavoriteService.getAllFavRooms().subscribe({
      next: (res) => {
        // console.log(res);
        this.favRoom = res.data.favoriteRooms;
        this.totalCount = res.data.favoriteRooms[0].rooms.length;
        //console.log(this.totalCount)
      }, error: (err: HttpErrorResponse) => {
        //console.log(err);
      }
    })
  }


  goLogin(): void {
    this._ToastrService.error('Login first')
    this._Router.navigate(['/auth'])

  }

  backToHome() {
    this._Router.navigate(['../'])

  }

  //for paginaton
  changePage(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getAllFav();
  }

  openDeleteDailog(roomId: string, roomNumber: string) {
    this.openDeleteDialog('700ms', '350ms', roomId, roomNumber, 'Room')

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
        this.onDelete(id)
      }
    })
  }

  onDelete(roomId: string) {
    this._FavoriteService.deleteRoomFav(roomId).subscribe({
      next: (res) => {
        console.log(res);
        this.deletRes = res;

      }, error: (err: HttpErrorResponse) => {
        console.log(err);
        this._ToastrService.error(err.error.message)
      }, complete: () => {
        this.showSuccessToaster('room-removed-from-favorites-successfully')
        this.getAllFav();
      }
    })
  }


  showSuccessToaster(toastEnAr:string) {
    this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
      this._ToastrService.success(res);
    });
  }
}
