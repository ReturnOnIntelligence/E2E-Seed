import {WebDriver} from 'selenium-webdriver';
import {BasePage} from '../core/basePage';
import {GooglePage} from './google';
import {PrivnotePage} from './privnote';

export class Page extends BasePage {

    public get GooglePage(): GooglePage {
        return new GooglePage(this.driver);
    }

    public get PrivnotePage(): PrivnotePage {
        return new PrivnotePage(this.driver);
    }
}