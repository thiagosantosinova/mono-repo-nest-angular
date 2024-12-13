interface ICompanies {
    ID: number;
    Name: string;
}

interface IEnterprises {
    ID: number;
    Name: string;
}

interface IEmployee {
    ID: number;
    Uid: string;
    Sector: string;
    Function: string;
    DepartmentID: string;
}

export interface IGetCurrentUser {
    ID: number
    Email: string;
    Username: string;
    IsEmployee: string;
    FirstName: string;
    DateJoined: string;
    LastLogin: string;
    Active: string;
    Group: {
        ID: number;
        Name: string;
    },

    Companies: ICompanies[];
    Enterprises: IEnterprises[];
    IsSuperuser: string;
    LastName: string;
    Employee: IEmployee;
}

