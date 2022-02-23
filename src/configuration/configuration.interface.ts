import { I18nLanguage } from "app/shared/helpers/enum";
import { AuthenticationModuleConfig } from "authentication-inklusion";

export interface IConfiguration {
    name: string;
    long_name: string;
    url: string;
    logo_path: string;
    logo_path_inverse_color: string;
    auth_logo: string;
    phone_number: string;
    fax_number: string;
    email: string;
    address: string[];
    coordinates: string;
    css: Css;
    social_links: SocialLinks;
    defaultLanguage: I18nLanguage;
    authConfig: AuthenticationSettings;
}

interface SocialLinks {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

interface Css {
    mainColor: string;
    mainColor50: string;
}

interface AuthenticationSettings extends AuthenticationModuleConfig {
    // mainColor: string;
}