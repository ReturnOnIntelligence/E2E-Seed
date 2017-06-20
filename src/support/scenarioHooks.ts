import * as Cucumber from 'cucumber';
import {cucumberTimeout} from '../appSettings/settings';
import {IWorld} from './world';

function definitions(): void {
  var hook = <Cucumber.Hooks>this;

  hook.setDefaultTimeout(cucumberTimeout);

  this.Before(async function(this: IWorld, scenario: Cucumber.HookScenario): Promise<void> {
    this.scenario = scenario;
  });

  hook.After(async function(this: IWorld, scenario: Cucumber.HookScenario): Promise<void> {
    let screenshot = await this.driver.takeScreenshot();
    scenario.attach(new Buffer(screenshot, 'base64'), 'image/png');
    await this.driver.quit();
  });
};

module.exports = definitions;