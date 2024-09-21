import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edite-view-facilities',
  templateUrl: './add-edite-view-facilities.component.html',
  styleUrls: ['./add-edite-view-facilities.component.scss']
})
export class AddEditeViewFacilitiesComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEditeViewFacilitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
    
    onNoClick(): void {
    this.dialogRef.close();
    }
}
