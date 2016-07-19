import * as Mongoose from 'mongoose';
import AraTesterAxisInfoDocument from './models/AraTesterAxisInfo/document';
import AraTesterAxisInfoModel from './models/AraTesterAxisInfo/model';

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/AraTester');

AraTesterAxisInfoModel.create({
    axisId: 0,
    pulseWidth: 2000,
    tMax: 800000,
    tMin: 40000,
    tDelta: 500,
    configured: 3200
}).then((created: AraTesterAxisInfoDocument) => {
    console.log(created);
}, (err: any) => {
    throw err;
});
