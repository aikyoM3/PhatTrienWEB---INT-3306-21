const mongoose = require('mongoose');
const sender = require('./senderModel');
const reciever = require('./recieverModel');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const PackageSchema = new Schema(
    {
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Sender',
        required: true
    },
    recipientId: {
        type: Schema.Types.ObjectId,
        ref: 'Reciever',
        required: true
    },
    status: {
        type: String,
        enum: ['delivered', 'not delivered', 'returned'],
        required: true
    },
    trackingUpdates: [{
        location: String,
        status: String,
        timestamp: Date
    }]  
    },
    {
        timestamps: true
    }
);

PackageSchema.plugin(AutoIncrement, {
    inc_field: 'packageId',
    id: 'package_num',
    start_seq: 500,
})

module.exports = mongoose.model('Package', PackageSchema)