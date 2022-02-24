/**
 * Gets a date in Readable Format (2019-09-12T10:34:56.2034)
 * @param formatedDate 
 */
export function GetFullDate(formatedDate: number): string {
    const date = new Date(formatedDate);

    return GetReadableDateTime(date);
}

export function ConvertFromCSharpTicks(numberTicks: number) {
    var jsTicks = (numberTicks - 621355968000000000) / 10000;
    return GetFullDate(jsTicks);
}

function addZeroBefore(n: number): string {
    return (n < 10 ? '0' : '') + n;
}

export function GetReadableDateTime(date: Date) {
    const day = addZeroBefore(date.getDate());
    const month = addZeroBefore(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = addZeroBefore(date.getHours());
    const minutes = addZeroBefore(date.getMinutes());
    const seconds = addZeroBefore(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function GetReadableDate(date: Date) {
    const day = addZeroBefore(date.getDate());
    const month = addZeroBefore(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}