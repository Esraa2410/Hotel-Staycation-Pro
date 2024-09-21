import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent {

  constructor( private translate: TranslateService,
    public dialogRef: MatDialogRef<AuthPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr:ToastrService,
    ) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        // do something
        //console.log(event)
        this.lang=event.lang
      });
    }

    onNoClick(): void {
    this.dialogRef.close();
    }

    lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';




}
