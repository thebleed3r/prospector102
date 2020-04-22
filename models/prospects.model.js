const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prospectionSchema = new Schema({
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    contact: { type: String, required: true },
    response: { type: String, required: true }
}, {
    timestamps: true
});

const Prospection = mongoose.model('Prospection', prospectionSchema);

module.exports = Prospection;

