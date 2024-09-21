
export interface IFacilitiesResponse {
    success: boolean
    message: string
    data: IData 
  }
  
  export interface IData {
    facilities: IFacility[]
    totalCount: number
  }
  
  export interface IFacility {
    _id: string
    name: string
    createdBy: ICreatedBy
    createdAt: string
    updatedAt: string
  }
  
  export interface ICreatedBy {
    _id: string
    userName: string
  }
  

  export interface IAddAndEditFacRes {
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    facility: IFacility
  }
  

  