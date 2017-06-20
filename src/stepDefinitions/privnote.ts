import {StepDefinitions, expect, Table, By, Key} from '../core/core';
import {TableDefinition} from 'cucumber';
import {IWorld} from '../support/world';

function definitions(): void {

    this.When(/^I sent '(.*)'$/, async function (this: IWorld, text: string): Promise<void> {
        await this.page.PrivnotePage.createNote(text);
        this.store.data.set('initMsg', text);
    });

    this.Then(/^I should see result url$/, async function (this: IWorld): Promise<void> {
        let result = await this.page.PrivnotePage.getUrlWithNote();
        this.store.data.set('url', result);
        expect(!!result).equal(true);
    });

    this.When(/^I navigate by url$/, async function (this: IWorld): Promise<void> {
        await this.driver.navigate().to(this.store.data.get('url'));
    });

    this.When(/^I open message$/, async function (this: IWorld): Promise<void> {
        let msg = await this.page.PrivnotePage.getSecureNote();
        this.store.data.set('msg', msg);
    });

    this.Then(/^I should see own message$/, async function (this: IWorld): Promise<void> {
        expect(this.store.data.get('initMsg')).equal(this.store.data.get('msg'), 'Message wrong');
    });

};

module.exports = definitions;