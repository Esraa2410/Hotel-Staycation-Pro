import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';


  constructor (    private translate: TranslateService,
    public _DialogRef:DialogRef,@Inject(DIALOG_DATA) public data: {comp:string,id:number,name:string}){

  translate.onLangChange.subscribe((event: LangChangeEvent) => {
    // do something
    //console.log(event)
    this.lang=event.lang
  });

}
}
