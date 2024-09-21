import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateBooking, IBookingResponse, IBookingDetailsRes } from '../models/IBookingResponse';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _HttpClient: HttpClient) { }

createBooking(data: ICreateBooking): Observable<IBookingResponse> {
  return this._HttpClient.post<IBookingResponse>('portal/booking', data);
}

getBookingById(id:string): Observable<IBookingDetailsRes> {
  return this._HttpClient.get<IBookingDetailsRes>(`portal/booking/${id}`, );
}

payBooking(id:string,tokenPay:string): Observable<IBookingDetailsRes> {
  return this._HttpClient.post<IBookingDetailsRes>(`portal/booking/${id}/pay`, 
    {
    token:tokenPay
  });
}

}
