
export interface IFavoriteResponse{
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    favoriteRoom: FavoriteRoom
  }
  
  export interface FavoriteRoom {
    rooms: string[]
    user: string
    _id: string
    createdAt: string
    updatedAt: string
  }
  export interface IAllFavRes {
    success: boolean
    message: string
    data: IAllFavResData
  }
  
  export interface IAllFavResData {
    favoriteRooms: IFavoriteRoom[]
    totalCount: number
  }
  
  export interface IFavoriteRoom {
    _id: string
    rooms: IRoom[]
    user: IUser
    createdAt: string
    updatedAt: string
  }
  
  export interface IRoom {
    _id: string
    roomNumber: string
    price: number
    capacity: number
    discount: number
    facilities: string[]
    createdBy: string
    images: string[]
    createdAt: string
    updatedAt: string
  }
  
  export interface IUser {
    _id: string
    userName: string
  }
  


  export interface IDeleteFavRes {
    success: boolean
    message: string
    data: IDeleteFavResData
  }
  
  export interface IDeleteFavResData {
    favoriteRoom: IDeleteFavResRoom
  }
  
  export interface IDeleteFavResRoom {
    _id: string
    rooms: string[]
    user: string
    createdAt: string
    updatedAt: string
  }