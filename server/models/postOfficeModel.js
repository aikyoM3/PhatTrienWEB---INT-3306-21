const mongoose = require('mongoose');
const Package = require('./packageModel')
const Transaction = require('./transactionModel')
const Schema = mongoose.Schema;

const PostOfficeSchema = new Schema({
    postOfficeId: {
        type: mongoose.Types.ObjectId,
        unique: true
    },
    region: {
        type: String,
        unique: true 
    },
    branchManager: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    package: [{
        type: mongoose.Types.ObjectId,
        ref: 'Package'
    }],
    transaction: [{
        type: mongoose.Types.ObjectId,
        ref: 'Transaction'
    }]
});

module.exports = mongoose.model('PostOffice', PostOfficeSchema)
