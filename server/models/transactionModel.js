const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionOrderSchema = new Schema({
    type: {
        type: String,
        enum: ['send to parcel consolidation point', 'send to recipient', 'return to post office'],
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'confirmed'],
        required: true
    },
    packageId: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    originLocationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    destinationLocationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('TransactionOrder', TransactionOrderSchema)