
export interface IBookingResponse {
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    booking: Booking
  }
  
  export interface Booking {
    startDate: string
    endDate: string
    totalPrice: number
    user: string
    room: string
    status: string
    _id: string
    
  }
  
export interface ICreateBooking {
    startDate: string
    endDate: string
    room: string
    totalPrice: number
  }
  

  export interface IBookingDetailsRes {
    success: boolean
    message: string
    data: DataDtails
  }
  
  export interface DataDtails {
    booking: BookingDetails
  }
  
  export interface BookingDetails {
    _id: string
    startDate: string
    endDate: string
    totalPrice: number
    user: User
    room: Room
    status: string
  
  }
  
  export interface User {
    _id: string
    userName: string
  }
  
  export interface Room {
    _id: string
    roomNumber: string
  }
  