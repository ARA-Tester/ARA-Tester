import * as Mongoose from 'mongoose';
import AraTesterAxisPositionDocument from './document';
import AraTesterAxisPositionSchema from './schema';

const AraTesterAxisPositionModel = Mongoose.model<AraTesterAxisPositionDocument>('AraTesterAxisPosition', AraTesterAxisPositionSchema);

export default AraTesterAxisPositionModel;