// const myShemas = require("./mongoShemas");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LessonSchema = new Schema({
    //this.titleId = titleId;
    students: {
        type: [mongoose.mongo.ObjectId],
        ref: "Student",
    },

    teacher: {
        type: mongoose.mongo.ObjectId,
        ref: "Teacher",
    },
    name: {
        type: String,
        default: "Charac"
    },
    maxStudentsNumber: {
        type: Number,
        default: 20,
    },
    lessonNumber: {
        type: Number,
        default: 1
    },
});
const LessonModel = mongoose.model('Lesson', LessonSchema);


module.exports = LessonModel;