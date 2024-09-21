import { IResetRequest, IResetResponse } from './../model/reset-password';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ILogIn } from '../model/ILogin';

import { IForgot } from '../model/IForgot';

import { IRegister } from '../model/IRegister.model';
import { Router } from '@angular/router';
import { IUserResponse } from 'src/app/shared/models/iUser';
// import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';


interface IChangePassword{
  oldPassword:string,
  newPassword:string,
  confirmPassword:string
}
export interface IChangePassRes {
  success: boolean
  message: string
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string | null = null;
  // private user: SocialUser | null = null;
  private user: SocialUser | null = null;

  constructor(private _HttpClient:HttpClient, private _Router:Router, 
    //private authService: SocialAuthService
    ) {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    // });
    if (localStorage.getItem('token') !== null) {
      this.getRole();
    }
  }

  login(userData:FormGroup):Observable<ILogIn>{
    return this._HttpClient.post<ILogIn>('admin/users/login',userData)
  }


  resetPassword(data:IResetRequest):Observable<IResetResponse>{
    return this._HttpClient.post<IResetResponse>('portal/users/reset-password' ,data)
  }


  forgetPass(mail:FormGroup):Observable<IForgot>{
    return this._HttpClient.post<IForgot>('portal/users/forgot-password',mail)

  }

  register(userData:FormData):Observable<IRegister>{
    return this._HttpClient.post<IRegister>('admin/users',userData)
  }
  getRole() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token !== null && role !== null) {
      this.role = role;
    } else {
    }
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('token');

    sessionStorage.clear();
    this._Router.navigate(['/auth']);
  }


  getUserProfile(id: string): Observable<IUserResponse> {
    return this._HttpClient.get<IUserResponse>(`admin/users/${id}`);
  }

  changePassword(data:IChangePassword): Observable<IChangePassRes> {
    return this._HttpClient.post<IChangePassRes>(`admin/users/change-password`,data);
  }

  getUser(): SocialUser | null {
    return this.user;
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
  //     this._HttpClient
  //       .post('portal/users/auth/google', { token: user.idToken })
  //       .subscribe(
  //         (response) => {
  //           // Handle response from backend
  //           console.log(response);
  //           // Optionally store token in local storage
  //         },
  //         (error) => {
  //           console.error('Google sign-in error:', error);
  //         }
  //       );
  //   }).catch((error) => {
  //     console.error('Google sign-in error:', error);
  //   });
  // }

  /*
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this._HttpClient
        .post('portal/users/auth/google', { token: user.idToken })
        .subscribe({
          next: (response) => {
            // Handle response from backend
            console.log(response);
            // Optionally store token in local storage
          },
          error: (error) => {
            console.error('Google sign-in error:', error);
          }
        });
    }).catch((error) => {
      console.error('Google sign-in error:', error);
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this._HttpClient
        .post('portal/users/auth/facebook', { token: user.authToken })
        .subscribe(
          (response) => {
            // Handle response from backend
            console.log(response);
            // Optionally store token in local storage
          },
          (error) => {
            console.error('Facebook sign-in error:', error);
          }
        );
    }).catch((error) => {
      console.error('Facebook sign-in error:', error);
    });
  }*/

  isAuthenticated(): boolean {
    return this.user != null;
  }

  loginGoogle(token:string):Observable<any>{
    return this._HttpClient.post('portal/users/auth/google',{
      accessToken:token
    })
  }

  }
