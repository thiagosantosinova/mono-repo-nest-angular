interface IPermissions {
    id: number;
    name: string;
}

export interface ILibUserPermissions {
    id: number;
    name: string;
    permissions: IPermissions[]
}