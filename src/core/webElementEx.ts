import {WebDriver, WebElement, By} from 'selenium-webdriver';
import {HelperBase} from './helperBase';
import {WaitHelper} from './waitHelper';


export class WebElementEx extends HelperBase {

    public async waitElement(by: By, timeout?: number): Promise<boolean> {
        let result = await WaitHelper.waitUntil( async (): Promise<boolean> => {
            let elems = await this.driver.findElements(by);
            return !!elems.length;
        },                                       timeout || 5000);
        return result;
    }

    public async forEach(locator: By, action: (elem: WebElement) => Promise<void>): Promise<void> {
       let elems = await this.driver.findElements(locator);
       let count = elems.length;
       for (let i = 0; i < count; i++) {
           let elems = await this.driver.findElements(locator); // protect for 'link is outdated'
           await action(elems[i]);
       }
    }

    /**
     * Use forEachOfDecrease if after action on element this element not exist when we try find by xpath
     */
    public async forEachOfDecrease(locator: By, action: (elem: WebElement) => Promise<void>): Promise<void> {
        let elementExists = async (locator): Promise<boolean> => {
            let elems = await this.driver.findElements(locator);
            return !!elems.length;
        };
        while (await elementExists(locator)) {
            let elem = await this.driver.findElement(locator);
            await action(elem);
        }
    }

    public async select<T extends number | boolean | string>
    (locator: By, action: <T extends number | boolean | string>(elem: WebElement) => Promise<T>): Promise<T[]> {
        let result = [];
        let elems = await this.driver.findElements(locator);
        let count = elems.length;
        for (let i = 0; i < count; i++) {
            let elems = await this.driver.findElements(locator);
            result.push(await action(elems[i]));
        }
        return result;
    }

    public async hoverAndClick(first: WebElement, second: WebElement): Promise<void> {
        await this.driver.actions().mouseMove(first).click(second).perform();
    }

    public async selectBoxOptionByText(xpath: string, text: string): Promise<void> {
        let fullXpath = xpath + `//option[normalize-space(.) = '${text}']`;
        await this.driver.findElement(By.xpath(fullXpath)).click();
    };

    public async selectBoxOptionByIndex(xpath: string, index: number): Promise<void> {
        let fullXpath = xpath + `//option`;
        let elems = await this.driver.findElements(By.xpath(fullXpath));
        await elems[index].click();
    };
}