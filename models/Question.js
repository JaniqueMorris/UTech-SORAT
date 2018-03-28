const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// question schema
const QuestionSchema = new Schema({
    section: {
        type: String,
        required: true
    },
    factor: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    answers: [
        {
            text: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],

});

const Question = module.exports = mongoose.model('Question', QuestionSchema, 'questions');