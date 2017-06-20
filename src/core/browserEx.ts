import {WebDriver, WebElement, By, IWebDriverOptionsCookie} from 'selenium-webdriver';
import * as rp from 'request-promise';
import {HelperBase} from './helperBase';
import * as http from 'http';
import * as https from 'https';

export class BrowserEx extends HelperBase {

    public async get(url: string):  Promise<void> {
        return await this.driver.get(url);
    }

    public async executeScript(script: string): Promise<any> {
        return await this.driver.executeScript(script);
    }

    public async navigateBack(): Promise<void> {
        await this.driver.navigate().back();
    }

    public async close(): Promise<void> {
        await this.driver.close();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public refresh(): void {
        this.driver.navigate().refresh();
    }

    public async resizeWindow(width: number, height: number): Promise<void> {
        await this.driver.manage().window().setSize(width, height);
    }

    public async scrollTo(horizontalPosition: number, verticalPosition: number): Promise<void> {
        await this.driver.executeScript(`scrollBy(${horizontalPosition},${verticalPosition})`);
    }

    public async getCookie(): Promise<string> {
        let wdCookies = await this.driver.manage().getCookies();
        let cookies = wdCookies.map(function(e: IWebDriverOptionsCookie): string {return e.name + '=' + e.value; });
        return cookies.join(';');
    }

    public async request(host: string, path: string, port: number, cookies?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let option: http.RequestOptions = {
                host: host,
                port: port || 80,
                path: path,
                headers: {'Cookie': cookies}
            };
            if ( port === 443) {
                let request = https.get(option, (response) => {
                    /*if (response.statusCode < 200 || response.statusCode > 299) {
                        reject(new Error('Failed to load page, status code: ' + response.statusCode));
                    }*/
                    const body = [];
                    response.on('data', (chunk) => body.push(chunk));
                    response.on('end', () => resolve(body.join('') || response.statusCode));
                });
                request.on('error', (err) => {
                    reject(err);
                });
            } else {
                let request = http.get(option, (response) => {
                    /*if (response.statusCode < 200 || response.statusCode > 299) {
                        reject(new Error('Failed to load page, status code: ' + response.statusCode));
                    }*/
                    const body = [];
                    response.on('data', (chunk) => body.push(chunk));
                    response.on('end', () => resolve(body.join('') || response.statusCode));
                });
                request.on('error', (err) => {
                    reject(err);
                });
            }
        });
    }
}