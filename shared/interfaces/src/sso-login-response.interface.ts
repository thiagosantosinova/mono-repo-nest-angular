import { IUser } from "./user.interface";

export interface ISSOLoginResponse {
    User: IUser;
    Token: string;
    ExpiresIn: number;
}