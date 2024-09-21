import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';
  constructor(private _ToastrService:ToastrService ,private _Router:Router, private translate: TranslateService,
  ){}
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });
  }

  contactForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    subject:new FormControl(null,[Validators.required]),
    message:new FormControl(null,[Validators.required]),
  })

  contact(form:FormGroup){
    if(form.valid){
      // this._ToastrService.success('');
      this.showSuccessToaster('message-sent-success')
    }
    this._Router.navigate(['/guest/home']);
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
