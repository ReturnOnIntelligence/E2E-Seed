import {WebDriver} from 'selenium-webdriver';
import {WebElementEx} from './webElementEx';
import {BrowserEx} from './browserEx';
import {RandomEx} from './randomEx';
import {WaitHelper} from './waitHelper';

export class BasePage {
    protected driver: WebDriver;
    protected webElementEx: WebElementEx;
    protected browserEx: BrowserEx;
    protected randomEx: RandomEx;

    constructor(dr: WebDriver) {
        this.driver = dr;
        this.webElementEx = new WebElementEx(this.driver);
        this.browserEx = new BrowserEx(this.driver);
    }
}
