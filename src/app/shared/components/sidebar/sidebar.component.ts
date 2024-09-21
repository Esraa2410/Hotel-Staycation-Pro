import { Component, EventEmitter, HostListener, Output } from '@angular/core';

interface IMenu {
  text:string ,
  icon:string ,
  link:string,
  
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isToggle:boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 1100;
 @Output() isToggledValue = new EventEmitter<boolean>();
   // then use role in menu conditions 
   menu:IMenu[] = [
    {
      text:'Home',
      icon:'fa fa-home' ,
      link:'/manager/home',
     
    },
    {
      text:'Users',
      icon:'fa-solid fa-user-group' ,
      link:'/manager/users',
   
    },
    {
      text:'Rooms',
      icon:"fa-solid fa-table-cells-large",
      link:'/manager/rooms',
     
    },
    {
      text:'Ads',
      icon:'fa-regular fa-calendar-days' ,
      link:'/manager/ads',
     
    },
    {
      text:'Facilities',
      icon:'fa-solid fa-user-group' ,
      link:'/manager/facilities',
     
    },
    {
      text:'Bookings',
      icon:'fa-solid fa-user-group' ,
      link:'/manager/booking',
     
    },
    
  
   ]


   @HostListener('window:resize', ['$event'])
   onResize(event: Event) {
     this.isSmallScreen = window.innerWidth <= 1100;
     if (this.isSmallScreen) {
       this.isToggle = false; // Ensure sidebar is collapsed on small screens
     }
   }
 
   toggleSidebar() {
     if (!this.isSmallScreen) {
       this.isToggle = !this.isToggle;
       this.isToggledValue.emit(this.isToggle);
     }
   }
}
