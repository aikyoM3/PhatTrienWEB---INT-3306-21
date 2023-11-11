const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const senderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
})

module.exports = Schema.model('Sender',senderSchema)