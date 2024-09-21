import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';
import { ViewUserProfileComponent } from 'src/app/shared/components/view-user-profile/view-user-profile.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('../guest/components/home/home.component').then(m => m.HomeComponent) },
      { path: 'explore', loadComponent: () => import('../guest/components/explore/explore.component').then(m => m.ExploreComponent) },
      { path: 'favorite', loadComponent: () => import('../guest/components/favorite/favorite.component').then(m => m.FavoriteComponent) },
      { path: 'room-details/:id', loadComponent: () => import('../guest/components/room-details/room-details.component').then(m => m.RoomDetailsComponent) },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'payment/:id', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule) },
      { path: 'profile/:id', component: ViewUserProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
