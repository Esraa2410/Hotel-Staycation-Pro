import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ILogIn } from '../../model/ILogin';
import { SharedModule } from 'src/app/shared/shared.module';
// import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedModule,
    //GoogleSigninButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLogged: ILogIn = {
    message: '',
    success: false,
    data: {
      token: '',
      user: {
        _id: '',
        userName: '',
        role: ''
      }
    }
  }

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]) // the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 6 characters long.
  })

  constructor(public _AuthService: AuthService, private _Router: Router, private toastr: ToastrService,
    //private socialAuthService: SocialAuthService
  ) { 
    // this.socialAuthService.authState.subscribe((user:SocialUser) => {
    //   if (user) {
    //     console.log('User logged in:', user);
    //     console.log('Access token:', user.idToken);

    //     this._AuthService.loginGoogle(user.idToken).subscribe({
    //       next: (response) => {

    //         console.log(response)
    //       },
    //       error: (err) => {
  
    //         console.log(err)
    //       },
    //     })
    //   }
          
    // });
  }


  login(data: FormGroup): void {

    if (data.valid == true) {

      this._AuthService.login(data.value).subscribe({
        next: (response) => {
          this.userLogged = response

        },
        error: (err) => {

          this.showError(err.error.message)
        },
        complete: () => {


          localStorage.setItem('token', this.userLogged.data.token)
          localStorage.setItem('role', this.userLogged.data.user.role)
          localStorage.setItem('id', this.userLogged.data.user._id)
          if (localStorage.getItem('role') === 'admin') {
            this._Router.navigate(['/manager/home'])

          } else{
              this._Router.navigate(['/guest/home'])

          }



        }
      })
    }
  }
  showError(mes: string) {
    this.toastr.error(mes);
  }
  accessToken = '';

  getAccessToken(): void {
    console.log(this.accessToken)
    //this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken) ;
    console.log(this.accessToken)

  }

 

  

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
  //     console.log('Facebook sign in successful');
  //   }).catch(err => {
  //     console.error('Error during Facebook sign in:', err);
  //   });
  // }

  // signInWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
  //     console.log('Google sign in successful');
  //   }).catch(err => {
  //     console.error('Error during Google sign in:', err);
  //   });
  // }

  signOut(): void {
    this._AuthService.logout();
  }

  navigateToDashboard(): void {
    if (this._AuthService.isAuthenticated()) {
      this._Router.navigate(['guest/home']);
    }
  }

}
