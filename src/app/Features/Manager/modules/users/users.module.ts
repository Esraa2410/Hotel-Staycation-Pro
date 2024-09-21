import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    UsersComponent,
    AddAdminComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxFileDropModule
  ]
})
export class UsersModule { }
