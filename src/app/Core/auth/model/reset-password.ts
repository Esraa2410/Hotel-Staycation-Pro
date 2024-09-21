export interface IResetRequest{
    email:string;
    password:string;
    confirmPassword:string;
    seed:string;
    }
    
    
    export interface IResetResponse{
        success: boolean;
        message: string;
        data: any;
    }