import AraTesterAxisInfoModel from './../models/AraTesterAxisInfo/model';
import AraTesterAxisInfoDocument from './../models/AraTesterAxisInfo/document';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import DBService from './DBService';

export default class AraTesterAxisConfigService implements DBService<AraTesterAxisId, AraTesterAxisConfig> {
    private static _service: AraTesterAxisConfigService;

    public static getService() {
        if(!AraTesterAxisConfigService._service) {
            AraTesterAxisConfigService._service = new AraTesterAxisConfigService();
        }
        return AraTesterAxisConfigService._service;
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
    
    public update(search: AraTesterAxisId, change: AraTesterAxisConfig): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisInfoModel.findOneAndUpdate(search, change, { new: true }).exec().then((document: AraTesterAxisInfoDocument) => {
                console.log(document);
                resolve();
            }, reject);
        });
    }
}
