import * as Mongoose from 'mongoose';
import AraTesterAxisInfo from './../../../share/AraTesterAxisInfo';

interface AraTesterAxisInfoDocument extends AraTesterAxisInfo, Mongoose.Document {

}

export default AraTesterAxisInfoDocument;
