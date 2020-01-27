const mongoose = require('mongoose');


const TeacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: "-",
    },
    age: {
        type: Number,
        default: -1,
    },
    role: {
        type: Number,
        default: 0,
    },
    lessons: {
        type: [mongoose.mongo.ObjectId],
        ref: "Lesson",
    },
});

const TeacherModel = mongoose.model('Charac', TeacherSchema);

module.exports = TeacherModel;
