import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { IRoom } from '../../../rooms/models/IRoom.model';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-add-ads-popup',
  templateUrl: './add-ads-popup.component.html',
  styleUrls: ['./add-ads-popup.component.scss']
})
export class AddAdsPopupComponent implements OnInit {
  roomControl = new FormControl();
  filteredRooms!: Observable<IRoom[]>;

  constructor(
    public dialogRef: MatDialogRef<AddAdsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.filteredRooms = this.roomControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.roomNumber)),
      map(value => this._filterRooms(value))
    );
  }

  private _filterRooms(value: string): IRoom[] {
    const filterValue = value.toLowerCase();
    return this.data.roomData.filter((room: IRoom) =>
      room.roomNumber.toLowerCase().includes(filterValue)
    );
  }

  displayRoom(room?: IRoom): string {
    return room ? room.roomNumber : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOptionSelected(event: any): void {
    const selectedRoom = event.option.value;
    this.data.room = selectedRoom._id;
  }
}
