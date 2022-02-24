import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { GetReadableDate, GetReadableDateTime } from "../helpers/date.helper";

@Pipe({ name: 'timeFormat' })
export class TimeFormatPipe implements PipeTransform {

    constructor(private _translateService: TranslateService) { }

    transform(dataString: string, showTime: boolean = true) {
        if (dataString == null) {
            return this._translateService.instant("PIPES.NOT_SET");
        }
        var date = new Date(dataString);
        return showTime ? GetReadableDateTime(date) : GetReadableDate(date)
    }
}