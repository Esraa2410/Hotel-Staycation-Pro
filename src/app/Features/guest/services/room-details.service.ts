import {  IRoomReveiwResponse ,IRommCommentResponse, IDeleteCommentResponse ,IDeleteCommentRequest ,IUpdateCommentResponse} from './../models/room-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {
  constructor(private _HttpClient: HttpClient) { }


  getRoomById(id: string): Observable<any> {
    return this._HttpClient.get(`portal/rooms/${id}`)

  }

  AddRoomreview( data: any): Observable<IRoomReveiwResponse> {
    return this._HttpClient.post<IRoomReveiwResponse>(`portal/room-reviews`,  data)
  }

  getAllRoomReviews(id:string):Observable<IRoomReveiwResponse>{
    return this._HttpClient.get<IRoomReveiwResponse>(`portal/room-reviews//${id}`)
  }

  AddRoomComment(data: FormGroup): Observable<IRommCommentResponse> {
    return this._HttpClient.post<IRommCommentResponse>(`portal/room-comments`, data)
  }

  updateComment(id:string , data:any ):Observable<IUpdateCommentResponse>{
    return this._HttpClient.patch<IUpdateCommentResponse>(`portal/room-comments/${id}` , data)
  }

  deletComment(commentId:string,roomId:string):Observable<IDeleteCommentResponse>{
    return this._HttpClient.delete<IDeleteCommentResponse>(`portal/room-comments/${commentId}?roomId=${roomId}`)
  }

  getAllRoomComments(id:string):Observable<IRommCommentResponse>{
    return this._HttpClient.get<IRommCommentResponse>(`portal/room-comments/${id}`)
  }





}
