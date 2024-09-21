import {  IAddAdminResponse, IGetAllUsersRequest ,IGetAllUsersResponse} from './../models/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }

  getAllUsers(params:IGetAllUsersRequest):Observable<IGetAllUsersResponse>{
    return this._HttpClient.get<IGetAllUsersResponse>('admin/users',{params:params})
  }

  addAdmin(userData:FormData):Observable<IAddAdminResponse>{
    return this._HttpClient.post<IAddAdminResponse>('admin/users',userData)
  }
}
