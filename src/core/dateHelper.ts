import * as moment from 'moment';

export class DateHelper {

    public static getDate(data: string): Date {
        let day =  this.getDay(data.substring(data.indexOf('Day:') + 5, data.indexOf(' Month:')));
        let month =  this.getMonth(data.substring(data.indexOf('Month:') + 7, data.indexOf(' Year:')));
        let year = this.getYear(data.substring(data.indexOf('Year:') + 6));
        return moment().year(year).month(month).date(day).toDate();
    }

    private static getDay(inputDay: string): number {
        let outputDay = moment();
        if (parseInt(inputDay, 10) > 0 && parseInt(inputDay, 10) < 32) {
            return parseInt(inputDay, 10);
        }
        switch (inputDay) {
            case 'current day': return parseInt(moment(outputDay).format('DD'), 10);
            case 'previous day': return parseInt(moment(outputDay).subtract(1, 'd').format('DD'), 10);
            case 'next day': return parseInt(moment(outputDay).add(1, 'd').format('DD'), 10);
            default:
        }
    }

    private static getMonth(inputMonth: string): number {
        let outputMonth = moment();
        if (parseInt(inputMonth, 10) > 0 && parseInt(inputMonth, 10) < 13) {
            return parseInt(inputMonth, 10) - 1;
        }
        switch (inputMonth) {
            case 'current month': return parseInt(moment(outputMonth).format('MM'), 10);
            case 'previous month': return parseInt(moment(outputMonth).subtract(1, 'M').format('MM'), 10);
            case 'next month': return parseInt(moment(outputMonth).add(1, 'M').format('MM'), 10);
            default:
        }
    }

    private static getYear(inputYear: string): number {
        let outputYear = moment();
        if (parseInt(inputYear, 10) > 0 && parseInt(inputYear, 10) < 9999) {
            return parseInt(inputYear, 10);
        }
        switch (inputYear) {
            case 'current year': return parseInt(moment(outputYear).format('YYYY'), 10);
            case 'previous year': return parseInt(moment(outputYear).subtract(1, 'y').format('YYYY'), 10);
            case 'next year': return parseInt(moment(outputYear).add(1, 'y').format('YYYY'), 10);
            default:
        }
    }
}