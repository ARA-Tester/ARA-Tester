import * as Mongoose from 'mongoose';
import AraTesterAxisInfoDocument from './models/AraTesterAxisInfo/document';
import AraTesterAxisInfoModel from './models/AraTesterAxisInfo/model';

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/AraTester');

AraTesterAxisInfoModel.create({
    axisId: 0,
    pulseWidth: 50,
    tMax: 5000000,
    tMin: 50000,
    tDelta: 1000,
    configured: 6400
}).then((created: AraTesterAxisInfoDocument) => {
    console.log(created);
}, (err: any) => {
    throw err;
});
