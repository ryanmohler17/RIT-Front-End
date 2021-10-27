export interface User {

    id?: number;
    username: string;
    password: string;
    email: string;
    level: 'Reporter' | 'Developer' | 'Admin' | 'SuperAdmin';
}
