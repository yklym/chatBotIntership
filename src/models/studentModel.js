const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: "-",
    },
    age: {
        type: Number,
        default: 0,
    },
    mark: {
        type: Number,
        default: 0,
    },
    lessons: {
        type: [mongoose.mongo.ObjectId],
        ref: "Lesson",
    },

});
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
