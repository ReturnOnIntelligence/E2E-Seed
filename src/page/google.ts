import * as WebDriver from 'selenium-webdriver';
import {BasePage, By, Key} from '../core/core';

export class GooglePage extends BasePage {

    public async enterText(text: string): Promise<void> {
        await this.webElementEx.waitElement(By.name('q'));
        await this.driver.findElement(By.name('q')).sendKeys(text);
        await this.driver.findElement(By.name('q')).sendKeys(Key.RETURN);
    }

    public async getCountOfResult(text: string): Promise<number> {
        let by = By.xpath(`//a[contains(text(), '${text}')]`);
        await this.webElementEx.waitElement(by);
        let elems = await this.driver.findElements(by);
        return elems.length;
    }
}