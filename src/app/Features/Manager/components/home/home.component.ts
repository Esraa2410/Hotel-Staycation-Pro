import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import Chart from 'chart.js/auto';
//interface
export interface iCahart {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  rooms: number
  facilities: number
  bookings: Bookings
  ads: number
  users: Users
}

export interface Bookings {
  pending: number
  completed: number
}

export interface Users {
  user: number
  admin: number
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  dashboardData!:Data;
  rooms!:number;
  facilities!:number;
  ads!:number;
  chart: any;
  userChart:any;
//will be edited if we add service file
  constructor(private _HttpClient:HttpClient){

  }
  getDashboardData():Observable<any>{
    return this._HttpClient.get('admin/dashboard');
  }


  ngOnInit(): void {
    this.getAlldashboardDataForHome();
  }

//
getAlldashboardDataForHome(){
  this.getDashboardData().subscribe({
    next:(res)=>{
this.dashboardData= res.data;
 this.rooms = this.dashboardData.rooms;
 this.facilities= this.dashboardData.facilities;
 this.ads=this.dashboardData.ads
    }
    ,
    complete:()=>{
     this.createChartForBooking();
     this.createChartForUSer()
    }
  })
}
 createChartForBooking(){
  this.chart = new Chart("myChart", {
    type: 'doughnut',
    data : {
      labels: [
        'Pending',
        'Completed',

      ],
      datasets: [{
        label: 'Bookings',
        data: [this.dashboardData?.bookings.pending, this.dashboardData.bookings.completed],
        backgroundColor: [
          'rgba(82, 107, 232, 0.7)',
          'rgba(160, 90, 206,0.7)',

        ],
        hoverOffset: 4
      }]
    }
  });
 }
 createChartForUSer(){
  this.userChart = new Chart("userChart", {
    type: 'doughnut',
    data : {
      labels: [
        'Admin',
        'User',

      ],
      datasets: [{
        label: 'Users',
        data: [this.dashboardData?.users.admin, this.dashboardData.users.user],
        backgroundColor: [
          'rgb(246, 194, 243)',
          'rgb(199, 202, 255)',

        ],
        hoverOffset: 4
      }]
    }
  });
 }

}
