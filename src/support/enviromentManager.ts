import {readFileSync} from 'fs';
import {settings} from '../appSettings/settings';
import {ICollectionSettings, ISettings, ISeleniumSettings, IDriverOptions, IUrls, IUsers, IUser} from '../appSettings/interfaces';
import * as _ from 'lodash';

class EnviromentManager {

    public settings: ISettings;
    public enviroment: string;

    constructor() {
        this.settings = this.getSettings();
        this.enviroment = this.getEnviroment();
    }

    private getEnviroment(): string {
        let index = process.argv.indexOf('-e') + 1;
        if (index > 2) {
            return process.argv[index];
        }
        return process.env.E2E_ENV || 'dev';
    }

    private getSettings(): ISettings {
        let env = this.getEnviroment();
        let defaultSettings = settings.default;
        let envSettings = settings[env];
        if (!envSettings) {
            throw new Error('invalid environment');
        }

        let result = _.defaultsDeep(/*{}, */envSettings, defaultSettings);
        return <ISettings>result;
    }
}

const env = new EnviromentManager().settings;
const enviroment = new EnviromentManager().enviroment;

export { env, enviroment };