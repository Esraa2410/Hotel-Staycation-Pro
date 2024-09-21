import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private _HttpClient: HttpClient) { }

  currentUser(userName: string, email: string, profileImage: string, _id: string): Observable<any> {
    return this._HttpClient.get(`admin/users/${_id}`
    , {params: { userName: userName, email:email, profileImage: profileImage, _id: _id},}
  );
  }

  getUserProfile(_id:string){
    return this._HttpClient.get(`portal/users/${_id}`)
  }

}
