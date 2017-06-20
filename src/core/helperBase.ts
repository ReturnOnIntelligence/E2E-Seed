import {WebDriver} from 'selenium-webdriver';

export class HelperBase {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }
}