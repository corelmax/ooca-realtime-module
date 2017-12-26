export interface IMessageDAL {
    getData(rid: string): Promise<any>;
    saveData(rid: string, chatRecord: Array<any>): Promise<any>;
    removeData(rid: string, callback?: (err: Error, res: any) => void): any;
    clearData(next: (err?: Error) => void): any;
}