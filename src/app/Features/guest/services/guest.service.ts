import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdsResponse } from '../../Manager/modules/ads/models/IAdsResponse';
import { IRoomResponse } from '../../Manager/modules/rooms/models/IRoom.model';
import { IFavoriteResponse } from '../components/favorite/models/IFavorite';
import { IBookingResponse, ICreateBooking } from '../models/IBookingResponse';

@Injectable({
  providedIn: 'root'
})
export class GuestService {


  constructor(private _HttpClient: HttpClient) { }

  getAllAds(): Observable<IAdsResponse> {
    return this._HttpClient.get<IAdsResponse>('portal/ads')
  }
  getAllRooms(data: object): Observable<IRoomResponse> {
    return this._HttpClient.get<IRoomResponse>('portal/rooms/available', data)
  }
  getAllRoomsForExplore(parmasData: any): Observable<IRoomResponse> {
    return this._HttpClient.get<IRoomResponse>('portal/rooms/available',  {params:parmasData})
  }
 
  getRoomById(id: number): Observable<any> {
    return this._HttpClient.get(`portal/rooms/${id}`)
  }


  saveFavRoom(roomId: string): Observable<IFavoriteResponse> {
    return this._HttpClient.post<IFavoriteResponse>('portal/favorite-rooms', { roomId });
  }

  getRoomFav(): Observable<any> {
    return this._HttpClient.get('portal/favorite-rooms')
  }

  getAllRoomReviews(id: any): Observable<any> {
    return this._HttpClient.get(`portal/room-reviews/${id}`)
  }


  removeFromFav(roomId: string): Observable<any> {
    return this._HttpClient.delete(`portal/favorite-rooms/${roomId}`, { body: { roomId } });
  }

  

}
