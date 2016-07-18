import AraTesterAxisInfoModel from './../models/AraTesterAxisInfo/model';
import AraTesterAxisInfoDocument from './../models/AraTesterAxisInfo/document';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import DBService from './DBService';

export default class AraTesterAxisConfigService implements DBService<AraTesterAxisId, AraTesterAxisConfig, AraTesterAxisInfoDocument> {
    private static _service: AraTesterAxisConfigService;

    public static getService() {
        if(!AraTesterAxisConfigService._service) {
            AraTesterAxisConfigService._service = new AraTesterAxisConfigService();
        }
        return AraTesterAxisConfigService._service;
    }

    /*private #uncomment when 2.0 is stable*/ constructor() {

    }

    public cast(document: AraTesterAxisInfoDocument): AraTesterAxisConfig {
        return {
            pulseWidth: document.pulseWidth,
            tMax: document.tMax,
            tMin: document.tMin,
            tDelta: document.tDelta,
            configured: document.configured
        };
    }

    public findOne(search: AraTesterAxisId): Promise<AraTesterAxisConfig> {
        return new Promise<AraTesterAxisConfig>((resolve: (value: AraTesterAxisConfig) => void, reject: (reason: any) => void) => {
             AraTesterAxisInfoModel.findOne(search).exec().then((document: AraTesterAxisInfoDocument) => {
                 if(document) {
                     resolve(this.cast(document));
                 } else {
                     resolve(document);
                 }
             }, reject);
        });
    }
    
    public update(search: AraTesterAxisId, change: AraTesterAxisConfig): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisInfoModel.findOneAndUpdate(search, change, { new: true }).exec().then((document: AraTesterAxisInfoDocument) => {
                resolve();
            }, reject);
        });
    }
}
