import {WebDriver, WebElement, By} from 'selenium-webdriver';
import * as RandExp from 'randexp';

export class RandomEx {

    public static getRandomText(size: number): string {
        var result = 'AT_';
        while (result.length < size) {
            result += Math.random().toString(36).slice(2, 12);
        }
        return result.substr(0, size);
    }

    public static getRandomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    public static getRandomNumber(min: number, max: number): number {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    public static getRandomTextByRegEx(regexp: string): string {
        return new RandExp(regexp).gen();
    }

    public static getRandomValueFromArray(arr: any[]): string {
        let rnd = this.getRandomNumber(0, arr.length - 1);
        return arr[rnd];
    }
}