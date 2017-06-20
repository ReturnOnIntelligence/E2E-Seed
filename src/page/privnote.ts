import * as WebDriver from 'selenium-webdriver';
import {BasePage, By, WaitHelper} from '../core/core';

export class PrivnotePage extends BasePage {
    private messageInput: By = By.xpath('//textarea');
    private sendBtn: By = By.xpath("//button[@id='encrypt_note']");
    private inputwithSecretUrl: By = By.xpath("//input[@id='note_link_input']");
    private readBtn: By = By.xpath("//button[@id='confirm_button']");

    public async createNote(text: string): Promise<void> {
        await this.driver.findElement(this.messageInput).sendKeys(text);
        await this.driver.findElement(this.sendBtn).click();
    }

    public async getUrlWithNote(): Promise<string> {
        await this.webElementEx.waitElement(By.xpath("//*[@id='info_read_once']"));
        await this.webElementEx.waitElement(this.inputwithSecretUrl);
        var url =  await this.driver.findElement(this.inputwithSecretUrl).getAttribute('value');
        return url;
    }

    public async getSecureNote(): Promise<string> {
        await this.webElementEx.waitElement(this.readBtn);
        await this.driver.findElement(this.readBtn).click();
        await this.webElementEx.waitElement(this.messageInput);
        return await this.driver.findElement(this.messageInput).getAttribute('value');
    }
}