const mongoose = require('mongoose');



const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: [true, 'name is required']
    },
    location: {
        type: String,
        minLength: 3,
        required: [true, 'location is required']
    },
    elevation: {
        type: Number,
        min: 0,
        required: true
    },
    lastEruption: {
        type: Number,
        min: 0,
        max: 2024,
        required: true
    },
    image: {
        type: String,
        match: /^https?:\/\/\S+$/,
        required: true
    },
    typeVolcano: {
        type: String,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        required: true
    },
    description: {
        type: String,
        min: 10,
        required: true
    },
    voteList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});
const Volcano = mongoose.model('Volcano', courseSchema);
module.exports = Volcano;