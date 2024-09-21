import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';

  constructor(private translate: TranslateService) {
    //console.log(this.lang)
  
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      //console.log(event)
      this.lang=event.lang
    });

    this.changeLanguage(this.lang)

}

changeLanguage(val:string):void{
  this.translate.setDefaultLang(val);
  this.translate.use(val);
  this.lang=val;
  localStorage.setItem('lang',this.lang)

}

}
