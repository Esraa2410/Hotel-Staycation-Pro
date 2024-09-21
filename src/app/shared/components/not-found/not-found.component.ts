import { Component, OnInit, Inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth/services/auth.service';
import { SharedModule } from '../../shared.module';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, SharedModule,TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';


  constructor(private _Router:Router, private _AuthService: AuthService,private translate: TranslateService) { 
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      //console.log(event)
      this.lang=event.lang
    });
  }

  OnInit() {
    this._AuthService.getRole();
  }

  isAdmin(): boolean {
    return this._AuthService.role === 'admin';
  }

  goHome() {
    this.isAdmin() ? this._Router.navigate(['/manager/home']) : this._Router.navigate(['/guest/home']);
  }



}
