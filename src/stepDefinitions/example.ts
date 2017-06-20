import {StepDefinitions, expect, Table, By, Key, WaitHelper} from '../core/core';
import {TableDefinition} from 'cucumber';
import {IWorld} from '../support/world';

function definitions(this: StepDefinitions): void {

    this.Given(/^I on '(.*)' website$/, async function (this: IWorld, url: string): Promise<void> {
        await this.driver.get(`http://www.${url}`);
    });

    this.When(/^I enter '(.*)' in search line$/, async function (this: IWorld, text: string): Promise<void> {
        await this.page.GooglePage.enterText(text);
    });

    this.Then(/^I should see some link to '(.*)' website$/, async function (this: IWorld, text: string): Promise<void> {
        let countOfRefs = await this.page.GooglePage.getCountOfResult(text);
        expect(countOfRefs).be.above(0, 'Refs was not found');
    });
};

module.exports = definitions;