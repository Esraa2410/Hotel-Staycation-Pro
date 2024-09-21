import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth/services/auth.service';
import { IUser, IUserResponse } from '../../models/iUser';
import { NavbarService } from '../../services/navbar.service';
import { ChangePassPopupComponent } from '../change-pass-popup/change-pass-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent  implements OnInit{
  loggedIn:boolean = false;
  tokenValue:any;
  userId!:any;
  currentUser:any
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';

  
  @Output() selectLanguage: EventEmitter<void> = new EventEmitter<void>();

  constructor(  private _AuthService: AuthService, public dialog: MatDialog,
    private _NavbarService: NavbarService,private _Router:Router,private translate: TranslateService){

  }
  ngOnInit() {
    this.changeLanguage(this.lang)

    this.tokenValue = localStorage.getItem('token');
    this.userId = localStorage.getItem('id');
      if(this.tokenValue != null){
       this.loggedIn =  true; 
      }
      if(this.userId != null){
        this.getUserProfile(this.userId)
      }
     
  }


  logout() {
    this._AuthService.logout();
  }
  register(){
    this._Router.navigateByUrl('/auth/register');

  }
  login(){
    this._Router.navigateByUrl('/auth/login');
    
  }
 
  getUserProfile(id:string){
   
    this._NavbarService.getUserProfile(id).subscribe({
      next:(res)=>{
      // console.log(res);
       this.currentUser=res
      }
    })
  }

  openChangePassDialog() {
    let oldPassword=''
    const dialogRef = this.dialog.open(ChangePassPopupComponent, {
     data: {oldPassword:'',newPassword:'',confirmPassword:''},
      width: '50%'
 
     });
 
     dialogRef.afterClosed().subscribe(result => {
     //console.log('The dialog was closed');
    // console.log( result);
     if(result){
   
     }
     });
 
 
   }



  changeLanguage(val:string):void{
    this.translate.setDefaultLang(val);
    this.translate.use(val);
    this.lang=val;
    localStorage.setItem('lang',this.lang)
  
  }
}
