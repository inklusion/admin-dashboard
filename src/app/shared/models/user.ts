import { AuthUser, Devices } from "authentication-inklusion";
import { UserType } from "../helpers/enum";

export class User implements AuthUser {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    token: string;
    refreshToken: string;
    userType: UserType;
    fakeUserType: UserType;
    language: number;
    lastLogin: Date;
    devices: Devices[];
    loginToken: string;
    isActive: boolean;
    addresses: Addresses;

    isAdmin = () => this.userType == UserType.ADMIN;
}

export class Addresses {
    billing: AddressInfo[];
    shipping: AddressInfo[];
}

export class AddressInfo {
    id: string;
    costumerName: string;
    vatNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postalCode: string;
    city: string;
    country: string;
    phoneNumber: string;
}