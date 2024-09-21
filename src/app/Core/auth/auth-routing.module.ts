import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    {path: '' , redirectTo: 'login' , pathMatch: 'full'},
    { path: 'login',  loadComponent: () => import('../auth/components/login/login.component').then(m => m.LoginComponent)},
    { path: 'register',  loadComponent: () => import('../auth/components/register/register.component').then(m => m.RegisterComponent)},
    { path: 'verify',  loadComponent: () => import('../auth/components/verify/verify.component').then(m => m.VerifyComponent)},
    { path: 'forgot',  loadComponent: () => import('../auth/components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)},
    { path: 'reset',  loadComponent: () => import('../auth/components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
