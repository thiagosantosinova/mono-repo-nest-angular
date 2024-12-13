interface IUser{
    id: number
    name: string 
    email: string
    username: string
    isEmployee: string
    dateJoined: string
    lastLogin: string
}

export interface ILibLoginResponse{
    user: IUser;
    token: string;
    expiresIn: number;
}