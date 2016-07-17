import AraTesterAxisInfoModel from './../models/AraTesterAxisInfo/model.ts';
import AraTesterAxisInfoDocument from './../models/AraTesterAxisInfo/document.ts';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import DBService from './DBService';

export default class AraTesterAxisConfigService implements DBService<AraTesterAxisId, AraTesterAxisConfig> {
    private static _instance: AraTesterAxisConfigService;

    public static getInstance() {
        if(!AraTesterAxisConfigService._instance) {
            AraTesterAxisConfigService._instance = new AraTesterAxisConfigService();
        }
        return AraTesterAxisConfigService._instance;
    }

    /*private #uncomment when 2.0 is stable*/ constructor() {

    }

    public findOne(search: AraTesterAxisId): Promise<AraTesterAxisConfig> {
        return new Promise<AraTesterAxisConfig>((resolve: (value: AraTesterAxisConfig) => void, reject: (reason: any) => void) => {
             AraTesterAxisInfoModel.findOne(search).exec().then((document: AraTesterAxisInfoDocument) => {
                 if(document) {
                     resolve(document as AraTesterAxisConfig);
                 } else {
                     resolve(document);
                 }
             }, reject);
        });
    }
    
    public static update(search: AraTesterAxisId, change: AraTesterAxisConfig): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisInfoModel.findOneAndUpdate(search, change).exec().then((document: AraTesterAxisInfoDocument) => {
                resolve();
            }, reject);
        });
    }
}