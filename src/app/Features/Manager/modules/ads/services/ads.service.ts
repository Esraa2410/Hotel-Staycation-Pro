import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams, IRoomResponse } from '../../rooms/models/IRoom.model';
import { IAdsResponse } from '../models/IAdsResponse';
import { IDelete } from 'src/app/shared/models/IDelete';

export interface IAds {
  room?: string
  discount: number
  isActive: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AdsService {

constructor(private _HttpClient:HttpClient) { }

getAllAds(parmasData:IParams):Observable<IAdsResponse>{
  return this._HttpClient.get<IAdsResponse>('admin/ads' , {params:
    {page:parmasData.page,
    size:parmasData.size}})
}

deleteAds(id:number):Observable<IDelete>{
  return this._HttpClient.delete<IDelete>(`admin/ads/${id}`)
}

updateADItem(id:number , data:IAds):Observable<any>
{
 return this._HttpClient.put(`admin/ads/${id}` , data)
}
viewADItem(id:number):Observable<any>{
  return this._HttpClient.get(`admin/ads/${id}`);
}
addADItem(paramsDAta:IAds):Observable<any>{
  return this._HttpClient.post(`admin/ads` ,paramsDAta)
}
}
