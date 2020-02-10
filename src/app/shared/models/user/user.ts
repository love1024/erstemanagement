export interface IUser {
    userId?: number,
    firstName: string;
    lastName: string;
    emailAddress: string;
    emailVerified?: string;
    expire?: string;
    token?: string
    role: string;
    passwordChanged?: string;
    maxUsers?: number;
    addedUsers?: number;
}