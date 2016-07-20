import * as Mongoose from 'mongoose';

const AraTesterAxisPositionSchema =  new Mongoose.Schema({
    axisId: {
        type: Number,
        required: true,
        unique: true
    },
    distance: {
        type: Number,
        required: true
    }
});

export default AraTesterAxisPositionSchema;