import { IFacilitiesResponse, IData, IFacility, ICreatedBy, IAddAndEditFacRes } from './models/facilities';
import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from './services/facilities.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { AddEditeViewFacilitiesComponent } from 'src/app/Features/Manager/modules/facilities/components/add-edite-view-facilities/add-edite-view-facilities.component';
import { IParams } from '../rooms/models/IRoom.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

interface EditEvent {
  id: number;
  name: string;
}
@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  search!: string;

  createdBy: ICreatedBy = {
    _id: '',
    userName: ''
  }
  facilities: IFacility = {
    _id: '',
    name: '',
    createdBy: this.createdBy,
    createdAt: '',
    updatedAt: ''
  }

  btnText: string = 'Add new facility';
  headerText: string = 'Facilities Table Details';
  headerPargraph: string = 'You can check all details';
  displayedColumns: string[] = ['Name', 'Created by'
    , 'Created at', 'Updated at', 'Actions'];

  totalCount!: number;
  pageSize = 10;
  pageIndex = 0;
  params: IParams = {
    page: this.pageIndex,
    size: this.pageSize

  }

  facilitiesData: IFacility[] = [];
  sortedFacilities: IFacility[] = [];



  constructor(private _FacilitiesService: FacilitiesService,
    private toastr: ToastrService, private _Router: Router, public dialog: MatDialog) { }

  editAddFacRes: IAddAndEditFacRes = {
    success: false,
    message: '',
    data: {
      facility: {
        _id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        createdBy: {
          _id: '',
          userName: ''
        }


      }
    }
  }



  ngOnInit(): void {
    this.getAllFaclities();
  }

  getAllFaclities() {
    this._FacilitiesService.getAllFacilities(this.params).subscribe({
      next: (res: IFacilitiesResponse) => {
        this.facilitiesData = res.data.facilities;
        this.sortedFacilities = this.facilitiesData.slice();
        this.totalCount = res.data.totalCount;
      }
    })
  }
  //sort data 
  sortData(sort: Sort) {
    const data = this.facilitiesData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedFacilities = data;
      return;
    }
    this.sortedFacilities = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdAt':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'updatedAt':
          return this.compare(a.updatedAt, b.updatedAt, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //for paginaton
  changePage(e: PageEvent) {
    this.params.page = e.pageIndex + 1;
    this.params.size = e.pageSize;
    this.getAllFaclities();
  }

  editOrView(id: number, name: string, editOrNotType: boolean) {
    const dialogRef = this.dialog.open(AddEditeViewFacilitiesComponent, {
      data: { id: id, edit: editOrNotType, name: name },
      width: '25%'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editOrNotType) {
          this.editFaility(id, result)
        } else {
          this.openDeleteDialog('700ms', '350ms', id, name, 'Facility')
        }
      }
    });


  }
  willBeDeleted(event: any) {
    this.openDeleteDialog('700ms', '350ms', event.id, event.name, 'Facility')
  }


  addFacility(): void {
    const dialogRef = this.dialog.open(AddEditeViewFacilitiesComponent, {
      data: { name: '' },
      width: '25%'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFaility(result)
      }
    });

  }
  // DELETE_DIALOG
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number, itname: string, componentName: string): void {
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
        this.deleteFacility(res)
      }
    })
  }
  // DELETE_FUNCTION
  deleteFacility(id: number) {
    this._FacilitiesService.deleteFacility(id).subscribe({
      error: err => {
        this.toastr.error(err.error.message)
      },
      complete: () => {
        this.toastr.success("Deleted succefully")
        this.getAllFaclities()
      }
    })
  }

  editFaility(id: number, name: string): void {
    this._FacilitiesService.editFacility(id, name).subscribe({
      next: (res) => {
        this.editAddFacRes = res;
      }, error: (err) => {
        this.toastr.error(err.error.message)
      }, complete: () => {
        this.getAllFaclities()
        this.toastr.success(this.editAddFacRes.message)
      }
    })
  }

  addFaility(name: number): void {
    this._FacilitiesService.addFacility(name).subscribe({
      next: (res) => {
        this.editAddFacRes = res;
      }, error: (err) => {
        this.toastr.error(err.error.message)
      }, complete: () => {
        this.getAllFaclities()
        this.toastr.success(this.editAddFacRes.message)
      }
    })
  }


  resetSearcgInput() {
    this.search = '';
    this.getAllFaclities();
  }

  filtetByName(searchValue: HTMLInputElement) {
    if (searchValue) {
      this.sortedFacilities = this.sortedFacilities.filter(p => p.name.includes(searchValue.value));
      this.totalCount = this.sortedFacilities.length
    }
  }

}
