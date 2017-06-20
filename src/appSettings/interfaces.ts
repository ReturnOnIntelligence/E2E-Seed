export interface ICollectionSettings {
    default: ISettings;
    [environment: string]: ISettings;
}

export interface ICollectionSettings2 {
    default: ISettings2;
    [environment: string]: ISettings2;
}

export interface ISettings2 {
    abc: string;
}

export interface ISettings {
    selenium: ISeleniumSettings;
    urls: IUrls;
    users: IUsers;
}

export interface ISeleniumSettings {
    url: string;
    driverOptions: IDriverOptions;
}

export interface IDriverOptions {
    browserName: string;
    timeout: number;
}


export interface IUrls {
    brokerPortal: string;
    adminPortal: string;
}

export interface IUsers {
    [user: string]: IUser;
}

export interface IUser {
    login: string;
    password: string;
}