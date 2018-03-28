const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// result schema
const ResultSchema = new Schema({
    section: {
        type: String
    },
    factor: {
        type: String,
    },
    value: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = module.exports = mongoose.model('Result', ResultSchema, 'results');