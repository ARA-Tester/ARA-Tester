import * as Mongoose from 'mongoose';
import AraTesterAxisInfoDocument from './document';
import AraTesterAxisInfoSchema from './schema';

const AraTesterAxisInfoModel = Mongoose.model<AraTesterAxisInfoDocument>('AraTesterAxisInfo', AraTesterAxisInfoSchema);

export default AraTesterAxisInfoModel;