import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import {  IRoomRes, IRoomResponse } from '../models/IRoom.model';
import { IFacilitiesResponse } from '../../facilities/models/facilities';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private _HttpClient:HttpClient) { }


  getAllRooms(parmasData:any):Observable<IRoomResponse>{
    return this._HttpClient.get<IRoomResponse>('admin/rooms' , {params:parmasData})
  }

  addRoom(data:FormData):Observable<IRoomRes>{
    return this._HttpClient.post<IRoomRes>('admin/rooms' , data)
  }

  editRoom(id:number,data:FormData):Observable<IRoomRes>{
    return this._HttpClient.put<IRoomRes>(`admin/rooms/${id}` , data)
  }

  getRoomById(id:number):Observable<IRoomRes>{
    return this._HttpClient.get<IRoomRes>(`admin/rooms/${id}`);

  }

  deleteRoom(id:number):Observable<any>{
    return this._HttpClient.delete(`admin/rooms/${id}`)
  }
  
  
}
