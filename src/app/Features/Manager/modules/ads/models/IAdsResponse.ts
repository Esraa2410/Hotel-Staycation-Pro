import { ICreatedBy, IRoom } from "../../rooms/models/IRoom.model"

export interface IAdsResponse {
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    ads: Ad[]
    totalCount: number
  }
  
  export interface Ad {
    _id: string
    isActive: boolean
    room: IRoom
    createdBy: ICreatedBy
    createdAt: string
    updatedAt: string
  }
  
  