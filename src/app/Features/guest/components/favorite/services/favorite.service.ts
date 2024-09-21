import { IAllFavRes, IDeleteFavRes } from './../models/IFavorite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private _HttpClient:HttpClient) { }

  getAllFavRooms():Observable<IAllFavRes>{
    return this._HttpClient.get<IAllFavRes>(`portal/favorite-rooms`)
  }

  deleteRoomFav(roomId:string):Observable<IDeleteFavRes>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { roomId: roomId }
    };
    return this._HttpClient.delete<IDeleteFavRes>(`portal/favorite-rooms/${roomId}` ,options)
  }
}
