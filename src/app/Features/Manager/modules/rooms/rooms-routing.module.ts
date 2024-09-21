import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddEditRoomComponent } from './components/add-edit-room/add-edit-room.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  {path:'addRoom',component:AddEditRoomComponent},
  {path:'editRoom/:id',component:AddEditRoomComponent},
  {path:'viewRoom/:id/:mode',component:AddEditRoomComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
