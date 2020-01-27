const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        default: 1,
    },
    fullname: {
        type: String,
        default: "-",
    },
    lessons: {
        type: [mongoose.mongo.ObjectId],
        ref: "Lesson",
    },

});
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
