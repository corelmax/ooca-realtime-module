export interface IStalkApi {
    apiKey: string;
    apiVersion: string;
    appId: string;
    chat: string;
    port: number;
}

export interface IConfig {
    Stalk: IStalkApi;
    api: IChitChatApi;
    appConfig: {
        encryption: boolean,
        secret: string
    };
}

export interface IChitChatApi {
    apiKey: string;
    host: string;
    api: string;
    auth: string;
    user: string;
    team: string;
    group: string;
    orgChart: string;
    chatroom: string;
    message: string;
    fileUpload: string;
}