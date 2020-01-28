const mongoose = require('mongoose');


const TeacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: "-",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
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

const TeacherModel = mongoose.model('teachers', TeacherSchema);

module.exports = TeacherModel;
