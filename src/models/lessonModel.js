// const myShemas = require("./mongoShemas");
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    group: {
        type: mongoose.mongo.ObjectId,
        ref: "Group",
    },
    teacher: {
        type: mongoose.mongo.ObjectId,
        ref: "Teacher",
        default: null,
    },
    name: {
        type: String,
        default: "Lesson",
    },
    maxStudentsNumber: {
        type: Number,
        default: 20,
    },
    lessonNumber: {
        type: Number,
        default: 1,
    },
});

const LessonModel = mongoose.model('Lesson', LessonSchema);

module.exports = LessonModel;
