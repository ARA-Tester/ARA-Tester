import * as Mongoose from 'mongoose';

const AraTesterAxisInfoSchema =  new Mongoose.Schema({
    axisId: {
        type: Number,
        required: true,
        unique: true
    },
    pulseWidth: {
        type: Number,
        required: true
    },
    tMax: {
        type: Number,
        required: true
    },
    tMin: {
        type: Number,
        required: true
    },
    tDelta: {
        type: Number,
        required: true
    },
    configured: {
        type: Number,
        required: true
    }
});

export default AraTesterAxisInfoSchema;