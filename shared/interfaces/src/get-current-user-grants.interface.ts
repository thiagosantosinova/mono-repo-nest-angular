interface IPermissions {
    ID: number;
    Name: string;
}

export interface IGetCurrentUserGrants {
    ID: number;
    Name: string;
    Permissions: IPermissions[]
}