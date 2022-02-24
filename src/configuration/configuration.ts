import { I18nLanguage } from "app/shared/helpers/enum";
import { IConfiguration } from "./configuration.interface";

export const configuration: IConfiguration = {
    name: "Inklusion",
    long_name: "Inklusion",
    url: "https://www.inklusion.pt/",
    logo_path: "/assets/images/logos/logo.webp",
    logo_path_inverse_color: "/assets/images/logos/logo_white.webp",
    auth_logo: "/assets/images/logos/logo.webp",
    phone_number: "+ 351 999 999 999",
    fax_number: "+ 351 999 999 999",
    email: "geral@inklusion.pt",
    address: [
        "Rua da Sede",
        "6200 - 000 Covilhã"
    ],
    coordinates: "40.253950, -7.496206",
    css: {
        mainColor: "#f90100",
        mainColor50: "#f9010080",
    },
    social_links: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: ""
    },
    defaultLanguage: I18nLanguage.PT,
    authConfig: {
        twoFactorAuthentication: {
            retrySeconds: 120,
            numberChars: 6,
            canHaveLowerCase: false,
            canHaveUpperCase: false,
            canHaveSpecialChars: false,
            canHaveNumbers: true
        },
        canCreateAccount: true,
        passwordSettings: {
            minSize: 10,
            mustHaveLowerCase: true,
            mustHaveUpperCase: true,
            mustHaveSpecialChars: true,
            mustHaveNumbers: true,
            showPasswordRequirements: true
        },
        canTogglePasswordInput: false,
        recaptcha: {
            enabled: false,
            publicKey: '6LduEdkbAAAAAI-xc_9QJSyz5CEQQbI5C29_jBbt'
        },
        platform_logo: "/assets/images/logos/logo.webp",
        platform_name: "Inklusion",
        loadInModal: false,
        allowCloseOnClickOutside: true,
        showLoadingBar: false,
        allowRegistration: true,
        showLabels: false,
        showPlaceholders: true,
        showRememberMe: false,
        floatLabel: true,
        redirectPath: "/dashboard",
        authenticationPath: "/"
    }
};
