interface ICompanies {
    id: number;
    name: string;
}

interface IEnterprises {
    id: number;
    name: string;
}

interface IEmployee {
    id: number;
    uid: string;
    sector: string;
    function: string;
    departmentId: string;
}

export interface ILibUserInfo {
    id: number
    email: string;
    username: string;
    isEmployee: string;
    firstname: string;
    dateJoined: string;
    lastLogin: string;
    active: string;
    group: {
        id: number;
        name: string;
    },

    companies: ICompanies[];
    enterprises: IEnterprises[];
    isSuperuser: string;
    lastname: string;
    employee: IEmployee;
}

