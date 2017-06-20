import * as I from './interfaces';

const cucumberTimeout = 5 * 60 * 1000;

const settings: I.ICollectionSettings = {
    default: {
        selenium: {
            url: 'http://localhost:4444/wd/hub',
            driverOptions: {
                browserName: 'chrome',
                timeout: 1200000
            }
        },
        urls: {
            brokerPortal: 'http://google.com',
            adminPortal:  'http://google.com'
        },
        users: undefined
    },
    dev: {
        selenium: undefined,
        urls: undefined,
        users: {
            Mario: {login: 'mario111', password: 'SecretPass!'},
            Toy:   {login: 'toy222', password: 'SecretPass2!'}
        }
    },
    qa: {
        selenium: undefined,
        urls: undefined,
        users: {
            Mario: {login: 'mario333', password: 'SecretPass!33'},
            Toy:   {login: 'toy333', password: 'SecretPass2!33'}
        }
    }
};

export { settings, cucumberTimeout }