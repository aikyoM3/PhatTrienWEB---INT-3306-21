const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CEO', 'post office manager', 'post office staff', 'gathering point manager', 'gathering point staff'],
        required: true,
        validate: {
            validator: async function(value) {
                const existingCEO = await mongoose.model('User').findOne({ role: 'CEO' });
                return !existingCEO;
            },
            message: 'There can be only one CEO',
        },
    },
});

module.exports = mongoose.model('User', UserSchema)