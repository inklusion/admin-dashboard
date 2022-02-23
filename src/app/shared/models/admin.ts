import { AuthUser, Devices } from 'authentication-inklusion';
import { I18nLanguage } from '../helpers/enum';

export class Admin implements AuthUser {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    token: string;
    refreshToken: string;
    userType: number;
    isActive: boolean;
    lastLogin: Date;
    devices: Devices[];
    loginToken: string;
    language: I18nLanguage;
}
