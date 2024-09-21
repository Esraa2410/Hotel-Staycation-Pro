import { Component, OnInit } from '@angular/core';
import { RoomsService } from './services/rooms.service';
import { IParams, IRoom, IRoomData } from './models/IRoom.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent  implements OnInit{
 
  //for header
  btnText :string = 'Add new room' ;
  headerText:string ='Rooms Table Details' ;
  headerPargraph:string ='You can check all details';
  addRoomLink:string =''
  facilityChanaged:string ='';
  //
  listOfFacilities :any;

  displayedColumns: string[] = ['Room number','Images'  
  ,'Capacity','Discount', 'Price' ,'Facilities' , 'Actions'];

  roomData:IRoom[]=[]
 search!:string;
  pageSize = 10;
  pageIndex = 0;
  totalCount!:number;
 
   ////
   params:IParams= {
    page :this.pageIndex,
    size:this.pageSize

  }
  

  sortedRooms:IRoom[] =[];

  constructor(private _RoomsService:RoomsService,private _Router:Router,public dialog: MatDialog, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getAllRooms();
  }

  sortData(sort: Sort) {
    const data = this.roomData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedRooms = data;
      return;
    }
    this.sortedRooms = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        case 'capacity':
          return this.compare(a.capacity, b.capacity, isAsc);
        case 'discount':
          return this.compare(a.discount, b.discount, isAsc);
        default:
          return 0;
      }
    });
  }
   compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


 
  getAllRooms(){
    this._RoomsService.getAllRooms(this.params).subscribe({
     next:(res )=>{
      this.roomData= res.data.rooms;
      this.sortedRooms= this.roomData.slice();
      this.totalCount =res.data.totalCount;   
     }    
    })

  }
     //for paginaton 
  changePage(e: PageEvent) {
    this.params.page = e.pageIndex + 1;
    this.params.size = e.pageSize;
    this.getAllRooms();
  }

  resetSearcgInput() {
    this. search= '';
    this.getAllRooms();
  }
  filtetByRoomNumber(searchValue :HTMLInputElement){
    if (searchValue) {
      this.sortedRooms = this.sortedRooms.filter(p => p.roomNumber.includes(searchValue.value));
      this.totalCount =this.sortedRooms.length
    }
  }


  addRoom():void{
    this._Router.navigate(['/manager/rooms/addRoom']);

  }

  deleteThisItem(id:number,name:string):void{
    this.openDeleteDialog('700ms','350ms',id,name,'Room')
  }
  
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:number,itname:string,componentName:string): void {
    const dialo =this.dialog.open(DeleteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        comp:componentName,
        id:id,
        name:itname
      }
    });
    dialo.afterClosed().subscribe(res=>{
      if(res!=null){
        this.deleteRoom(res)
      }
    })
  }

  deleteRoom(id:number):void{
    this._RoomsService.deleteRoom(id).subscribe({
      error:err=>{
        this.toastr.error(err.error.message)
      },
      complete:()=>{
        this.toastr.success("Deleted succefully")
        this.getAllRooms()
      }
    })
  }
}
