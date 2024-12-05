const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const Organization = mongoose.model('organization',orgSchema);

module.exports = Organization;