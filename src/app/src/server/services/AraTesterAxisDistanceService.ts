import AraTesterAxisPositionModel from './../models/AraTesterAxisPosition/model';
import AraTesterAxisPositionDocument from './../models/AraTesterAxisPosition/document';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import AraTesterAxisDistance from './../../share/AraTesterAxisDistance';
import DBService from './DBService';

export default class AraTesterAxisDistanceService implements DBService<AraTesterAxisId, AraTesterAxisDistance, AraTesterAxisPositionDocument> {
    private static _service: AraTesterAxisDistanceService;

    public static getService() {
        if(!AraTesterAxisDistanceService._service) {
            AraTesterAxisDistanceService._service = new AraTesterAxisDistanceService();
        }
        return AraTesterAxisDistanceService._service;
    }

    /*private #uncomment when 2.0 is stable*/ constructor() {

    }

    public cast(document: AraTesterAxisPositionDocument): AraTesterAxisDistance {
        return {
            distance: document.distance
        };
    }

    public findOne(search: AraTesterAxisId): Promise<AraTesterAxisDistance> {
        return new Promise<AraTesterAxisDistance>((resolve: (value: AraTesterAxisDistance) => void, reject: (reason: any) => void) => {
             AraTesterAxisPositionModel.findOne(search).exec().then((document: AraTesterAxisPositionDocument) => {
                 if(document) {
                     resolve(this.cast(document));
                 } else {
                     resolve(document);
                 }
             }, reject);
        });
    }
    
    public update(search: AraTesterAxisId, change: AraTesterAxisDistance): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisPositionModel.findOneAndUpdate(search, change, { new: true }).exec().then((document: AraTesterAxisPositionDocument) => {
                resolve();
            }, reject);
        });
    }
}
