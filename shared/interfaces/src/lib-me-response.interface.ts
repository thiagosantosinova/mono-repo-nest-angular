import { ILibUserDeparment } from "./lib-user-departaments.interface";
import { ILibUserInfo } from "./lib-user-info.interface";
import { ILibUserPermissions } from "./lib-user-permissions.interface";


export interface ILibMeResponse {
    userInfo: ILibUserInfo,
    userPermissions: ILibUserPermissions[],
    userDepartment: ILibUserDeparment
}