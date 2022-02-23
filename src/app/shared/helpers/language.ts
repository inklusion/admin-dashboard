import { I18nLanguage } from "./enum";

const languageDefault = "EN";

export function indexToLanguage(position: number): string {
    var language = I18nLanguage[position];
    if (language == undefined) {
        language = languageDefault;
    }
    return language;
}

export function languageToIndex(keyName: string): number {
    let i = 0;
    for (var enumMember in I18nLanguage) {
        if (parseInt(enumMember, 10) >= 0) {
            if (I18nLanguage[enumMember].toLowerCase() === keyName.toLowerCase()) {
                return i;
            }
        }
        i++;
    }
    return 0;
}