const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Please provide Image URL!"]
    }
});
const highlights = new mongoose.Schema({
    highlight: {
        type: String,
        required: [true, "Please provide Image URL!"]
    }
});
const reminders = new mongoose.Schema({
    reminder: {
        type: String,
        required: [true, "Please provide Image URL!"]
    }
});
const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name!"]
    },
    knownfor: {
        type: String,
        required: [true, "Please provide name!"]
    },
    location: {
        type: String,
        required: [true, "Please provide location!"]
    },
    attractiontype: {
        type: String,
        required: [true, "Please provide attractiontype!"]
    },
    operationtime: {
        type: String,
        required: [true, "Please provide operationtime!"]
    },
    Licenseimage: {
        type: String,
    },
    entryfee: {
        type: String,
        required: [true, "Please provide entryfee!"]
    },
    raddress: {
        type: String,
        required: [true, "Please provide raddress!"]
    },
    highlights:[highlights],
    rule:[reminders],
    attractionimages: [imageSchema]
});

const ATTRACTION = mongoose.model('ATTRACTION', attractionSchema);
module.exports = ATTRACTION;

