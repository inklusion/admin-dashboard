export enum I18nLanguage {
    NOT_SPECIFIED = 0,
    EN = 1,
    PT = 2
}

export enum UserLoginDuration {
    NO_LIMIT = 0,
    HOUR_12 = 4, //12 horas
    HOUR_24 = 1, //24 horas
    HOUR_48 = 2, // 48 horas
    HOUR_168 = 3, //1 semana
}

export enum CartItemType {
    CATALOGUE = 0,
    COUPON = 1,
    SAMPLE = 2
}

export enum UserType {
    NO_TYPE = 0,
    CLIENT = 1,
    ADMIN = 2,
    PROVIDER = 3,
    COLLABORATOR = 4,
}
