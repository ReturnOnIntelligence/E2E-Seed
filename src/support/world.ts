import {Store} from './store';
import * as Cucumber from 'cucumber';
import * as WebDriver from 'selenium-webdriver';
import {Page} from '../page/page';
import * as Env from './enviromentManager';
import {ISettings} from '../appSettings/interfaces';

function World(this: IWorld): void {
  this.settings = Env.env;
  this.enviroment = Env.enviroment;
  this.driver = new WebDriver.Builder()
    .usingServer(this.settings.selenium.url)
    .withCapabilities(this.settings.selenium.driverOptions)
    .build();
  this.store = new Store();
  this.page = new Page(this.driver);
  this.saveScreen = async (): Promise<void> => {
    let screenshot = await this.driver.takeScreenshot();
    this.scenario.attach(new Buffer(screenshot, 'base64'), 'image/png');
  };
  this.driver.manage().window().maximize();
}

module.exports = function initWorld(): void {
  this.World = World;
};

export interface IWorld {
  driver: WebDriver.WebDriver;
  store: Store;
  page: Page;
  settings: ISettings;
  enviroment: string;
  scenario?: Cucumber.HookScenario;
  saveScreen(): Promise<void>;
}