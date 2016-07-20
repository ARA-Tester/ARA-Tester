import * as Mongoose from 'mongoose';
import AraTesterAxisPosition from './../../../share/AraTesterAxisPosition';

interface AraTesterAxisPositionDocument extends AraTesterAxisPosition, Mongoose.Document {

}

export default AraTesterAxisPositionDocument;