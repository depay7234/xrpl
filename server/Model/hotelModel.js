// const mongoose = require('mongoose')
// const imageSchema = new mongoose.Schema({
//     imageUrl: {
//         type: String,
//         required: [true, "Please provide Image URL!"]
//     }
// });
// const highlights = new mongoose.Schema({
//     highlight: {
//         type: String,
//         required: [true, "Please provide Image URL!"]
//     }
// });
// const reminders = new mongoose.Schema({
//     reminder: {
//         type: String,
//         required: [true, "Please provide Image URL!"]
//     }
// });
// const hotelSchema = new mongoose.Schema({
//     owner:{
//         type: ref
//     },
//     name: {
//         type: String,
//         required: [true, "Please provide Name!"]
//     },
//     location: {
//         type: String,
//         required: [true, "Please provide location!"]
//     },
//     star: {
//         type: String,
//         required: [true, "Please provide star!"]
//     },
//     amount: {
//         type: String,
//         required: [true, "Please provide amount!"]
//     },
//     knownfor: {
//         type: String,
//         required: [true, "Please provide knownfor!"]
//     },
//     sovereignty: {
//         type: String,
//         required: [true, "Please provide sovereignty!"]
//     },
//     highlights:[highlights],
//     rule:[reminders],
//     hotelimages: [imageSchema]
// });

// const HOETL = mongoose.model('HOTEL', hotelSchema);
// module.exports = HOETL;


const mongoose = require('mongoose');

// Schema for images
const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Please provide Image URL!"]
    }
});

// Schema for highlights
const highlightSchema = new mongoose.Schema({
    highlight: {
        type: String,
        required: [true, "Please provide highlight!"]
    }
});

// Schema for reminders
const reminderSchema = new mongoose.Schema({
    reminder: {
        type: String,
        required: [true, "Please provide reminder!"]
    }
});

// Main hotel schema
const hotelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    name: {
        type: String,
        required: [true, "Please provide Name!"]
    },
    location: {
        type: String,
        required: [true, "Please provide location!"]
    },
    star: {
        type: String,
        required: [true, "Please provide star!"]
    },
    amount: {
        type: String,
        required: [true, "Please provide amount!"]
    },
    knownfor: {
        type: String,
        required: [true, "Please provide knownfor!"]
    },
    roomtype:{
        type: [String],
        required: [true, "Please provide knownfor!"]
    },
    sovereignty: {
        type: String,
        required: [true, "Please provide sovereignty!"]
    },
    highlights: [highlightSchema],
    rules: [reminderSchema], // Changed 'rule' to 'rules' for clarity
    hotelImages: [imageSchema] // Changed 'hotelimages' to 'hotelImages' for clarity
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;

