export interface IRoomReveiwRequest {
  roomId: string
  rating: number
  review: string
}

export interface IRoomReveiwResponse {
  success: boolean
  message: string
  data: IRoomReviewData
}

export interface IRoomReviewData {
  roomReviews: RoomReview[]
  totalCount: number
}

export interface RoomReview {
  room: Room
  user: IUser
  rating: number
  review: string
  _id: string
  createdAt: string
  updatedAt: string
}
export interface Room {
  _id: string
  roomNumber: string
}

export interface IRommCommentRequest {
  roomId: string
  comment: string
}

export interface IRommCommentResponse {
  success: boolean
  message: string
  data: IRommCommentData
}

export interface IRommCommentData {
  roomComments: IRoomComment[],

}

export interface IRoomComment {
  room: string
  user: IUser
  comment: string
  _id: string
  createdAt: string
  updatedAt: string
}
export interface Room {
  _id: string
  roomNumber: string
}

export interface IUser {
  _id: string
  userName: string
  profileImage: string
}


export interface IUpdateCommentRequest {
  comment: string;
}
export interface IUpdateCommentResponse {
  success: boolean
  message: string
  data: IUpdateCommentData
}

export interface IUpdateCommentData {
  comment: IUpdateCommentDataComment
}

export interface IUpdateCommentDataComment {
  _id: string
  room: string
  user: string
  comment: string
  createdAt: string
  updatedAt: string
}
export interface IDeleteCommentRequest {
  roomId:string;
}
export interface IDeleteCommentResponse {
  success: boolean
  message: string
}