import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ViewUserProfileComponent } from 'src/app/shared/components/view-user-profile/view-user-profile.component';

const routes: Routes = [
  { path: '', component: ManagerComponent, children: [
    {path:'',redirectTo:'home',pathMatch:'full'},
 
    { path: 'home',  loadComponent: 
    () => import('../Manager/components/home/home.component').then(m => m.HomeComponent)},
  
  { path: 'rooms', loadChildren: () => import('./modules/rooms/rooms.module').then(m => m.RoomsModule) },
  { path: 'ads', loadChildren: () => import('./modules/ads/ads.module').then(m => m.AdsModule) },
  { path: 'facilities', loadChildren:
   () => import('./modules/facilities/facilities.module').then(m => m.FacilitiesModule) },
   { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'booking', loadChildren: () => import('./modules/booking/booking.module').then(m => m.BookingModule) },
  {
    path:'profile/:id' , component:ViewUserProfileComponent
  },
  {
    path:'profile/:id/:viewUser' , component:ViewUserProfileComponent
  },

]
  },
 ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
