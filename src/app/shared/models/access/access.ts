
export interface IAccessDto {
    userAccess: IUserAccessDto;
}

export interface IUserAccessDto {
    name: string;
    userId: number;
    create: boolean;
    delete: boolean;
    edit: boolean;
    view: boolean;
}