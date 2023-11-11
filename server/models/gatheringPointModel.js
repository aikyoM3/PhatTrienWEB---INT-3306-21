const gatheringPointSchema = new Schema({
    parcelConsolidationPointId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    leaderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postOfficesIds: [{
        type: Schema.Types.ObjectId,
        ref: 'PostOffice'
    }]
});

module.exports = mongoose.model('gatheringPoint',gatheringPointSchema)
