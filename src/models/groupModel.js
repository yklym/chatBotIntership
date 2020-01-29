const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        default: 1,
    },
    students: {
        type: [mongoose.mongo.ObjectId],
        ref: "Student",
    },

});

const GroupModel = mongoose.model('Group', GroupSchema);

module.exports = GroupModel;
