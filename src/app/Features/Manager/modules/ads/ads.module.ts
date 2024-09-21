import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateViewAdsComponent } from './components/update-view-ads/update-view-ads.component';
import { AddAdsPopupComponent } from './components/add-ads-popup/add-ads-popup.component';



@NgModule({
  declarations: [
    AdsComponent,
    UpdateViewAdsComponent,
    AddAdsPopupComponent,
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    SharedModule
  ]
})
export class AdsModule { }
