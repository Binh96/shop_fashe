import { AppUser } from "./app-user";

export interface User {
    id?: number,
    address?: string,
    birthday?: string,
    email?: string,
    image?: string,
    name?: string,
    appUser?: AppUser,
    numberPhone?: string
}
