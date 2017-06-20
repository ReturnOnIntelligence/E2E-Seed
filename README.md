## Description of the project:
This is a template of an autotest project.
This project helps to quickly start autotest development for a Web project.
It is based on open source technologies and has  flexibility of settings.

List of technologies:
* TypeScript
* NodeJS
* Selenium
* CucumberJS
* Gulp

![Image of Yaktocat](https://github.com/ReturnOnIntelligence/E2E-Seed/blob/master/assets/e2e-seed.png)

This project contains basic project structure with the ability to:
* debug tests,
* perform a simple run,
* perform a parallel run,
* writing tests in accordance with the pageObject pattern.

## How To Use
### Prerequisities
1.	Install Visual Studio Code  https://code.visualstudio.com/
2.	Install Node.js https://nodejs.org/en/ (Current version) and  restart the PC after installation.
3.	Clone current repository
4.  Install Java http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
5.	Install Google Chrome
6.	Install Extension for VS Code(Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.):
```shell
    ext install cucumber 
    ext install tslint 
    ext install vscode-codemetrics
    ext install cucumber-mapper
```
### Install dependencies
1. Install npm packages
```shell
    npm install
    npm install -g gulp-cli --save
    npm install webdriver-manager -g
```
2. Update Webdriver-Manager
```shell
    webdriver-manager update
```
## List of basic files in the project:
*	world.ts – a file for creating unique global context for the scenario.
*	scenarioHooks.ts - defined some global hooks.
*	store.ts - class for storing  temporary data for the scenario.
*	basePage.ts - BasePage description .
*	core.ts - main space for exporting  the necessary data types.
*	settings.ts - settings for the browser.
*	gulpfile.js - task runner.

## Get Started(Order of test creation)
You can investigate the integrated test ”googleSearch.feature” or write your own test.

Just see the instructions below.

* Assumption: We have a portal. The Portal is available on the url: https://portal.com and we want to write a test for logging into the  portal.

1. Create a new file in /features/ folder. For example: login.feature 

```gherkin
# features/login.feature
Feature: Login feature
 As a user of Portal
 I want login on portal

Scenario: Login on portal
   Given I am on the Login Page
   When I login as 'admin@portal.ru' with pass 'MyPassword!'
   Then I should see Dashboard Page
```

2. Create the file with step definitions. For example: login.ts

```javascript
// ../src/step_definitions/login.ts
import {IWorld} from '../support/world';
import {StepDefinitions, expect} from '../core/core';

function definitions(this: StepDefinitions): void {

    this.Given(/^I am on the Login Page$/, async function (this: IWorld): Promise<void> {
        throw 'not implemented';
    });

    this.When(/^I login as '(.*)' with pass '(.*)'$/, async function (this: IWorld, userName: string, userPass: string): Promise<void> {
        throw 'not implemented';
    });

    this.Then(/^I should see page '(.*)'$/, async function (this: IWorld, pageHeader: string): Promise<void> {
        throw 'not implemented';
    });
};

module.exports = definitions;

```

3. Create a PortalBasePage class which contains a base description of the pages we want to test.
Inherit it from BasePage from '../core/core'. Let's also implement the IWait interface.
The IWait interface contains one method: waitPortal. 
For Example: if the portal has a loading indicator, you can implement the method for waiting. 
Also, let's add a method to check the header on the page.

```javascript
// ../src/page/portalBasePage.ts
import {WaitHelper, WebElement, BasePage, By} from '../core/core';

export class PortalBasePage extends BasePage {
    private loadingIndicator: By = By.xpath("//div[contains(@class, 'blocking-overlay')]")

    public async headerIsExists(pageHeader: string): Promise<boolean> {
        await this.waitPortal();
        let xPathForHeader = `//h1[contains(text(), '${pageHeader}')]`;
        return await By.xpath(xPathForHeader).isExists();
    }

    public async waitPortal(timeout?: number, interval?: number): Promise<void> {
        let doesLoadingExist =  async (): Promise<boolean> => {
            let elem = await this.driver.findElements(this.loadingIndicator);
            return !elem.length;
        };
        let waitngForSpinner = await WaitHelper.waitUntil(doesLoadingExist, timeout || this.longTimeout, interval);

        if (!waitngForSpinner) {
            throw new Error('Loading indicator failed');
        }
    }

```

4.  Create pageObjects which describe pages or parts of a page. They should inherit  PortalBasePage.
Let's create pageObject LoginPage.ts, which contains one method for login.

```javascript
// ../src/page/pages/loginPage.ts
import {By, Browser, WebElement} from '../../core/core';
import {PortalBasePage} from '../portalBasePage';

export class LoginPage extends PortalBasePage {

    public loginInputBox: By = By.xpath("//*[@id='Username']");
    public passwordInputBox: By = By.xpath("//*[@id='Password']");
    public loginBtn: By = By.xpath("//*[text()='Continue']");

    public async login(login: string, pass: string): Promise<void> {
        await super.waitPortal();
        await this.loginInputBox.sendKeys(login);
        await this.passwordInputBox.sendKeys(pass);
        await this.loginBtn.click();
    }
}

```

5. Add new LoginPage and PortalBasePage in pageCollection.ts(as property).

```javascript
// ../src/page/pageCollection.ts
    public get LoginPage(): LoginPage { return new LoginPage(this.dr); }
    public get PortalBasePage(): PortalBasePage { return new PortalBasePage(this.dr); }

```

6. Implement step definitions related to login action.

```javascript
// ../src/step_definitions/login.ts
import {IWorld} from '../support/world';
import {StepDefinitions, expect} from '../core/core';

function definitions(this: StepDefinitions): void {

    this.Given(/^I am on the Login Page$/, async function (this: IWorld): Promise<void> {
        await this.dr.get('https://portal.com');
    });

    this.When(/^I login as '(.*)' with pass '(.*)'$/, async function (this: IWorld, userName: string, userPass: string): Promise<void> {
        await this.page.LoginPage.login(userName, userPass);
    });

    this.Then(/^I should see page '(.*)'$/, async function (this: IWorld, pageHeader: string): Promise<void> {
        let res = await this.page.PortalBasePage.headerIsExists(pageHeader);
        expect(res).equal(true, `Log In don't passed`);
    });
};

```

Note:
In step definitions we pass `this: IWorld` as a first parameter.
See \src\support\world.ts to get more information.

7. Run test in VS Code

7.1 Start Webdriver-Manager before run tests:
```shell
    webdriver-manager start
```
Or run
```shell
    runWebDriver.sh
```
7.2 Start tests
```shell
    run.sh
```
Or you can use Debug Panel for running the test and generating the report 
* Run @test - run test which marked as @test
* Generate Report 


