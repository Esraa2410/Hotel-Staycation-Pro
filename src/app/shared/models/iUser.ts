export interface IUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber?: number;
  country?: string;
  role?: string;
  profileImage?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
  };
}

