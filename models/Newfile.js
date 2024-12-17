const mongoose = require('mongoose');
const Organization = require('./Organization.js');

const examSchema = new mongoose.Schema({
    examName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    eligibility:{
        type: String,
        required: true
    },
    syllabus:{
        type: String,
        required: true
    },
    pyq: [
        {
            filename: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    format:{
        type: String,
        required: true
    },
    pattern:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'organization',
        required: true 
    }

})

const Exam = mongoose.model('exam',examSchema);

module.exports = Exam;