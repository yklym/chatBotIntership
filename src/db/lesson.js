const LessonModel = require('../models/lessonModel');

class Lesson {
    constructor(name = "", teacher = -1, students = [], maxStudentsNumber = 20, lessonNumber = 1) {
        this.name = name;
        this.teacher = teacher;
        this.students = students;
        this.maxStudentsNumber = maxStudentsNumber;
        this.lessonNumber = lessonNumber;
    }

    static insert(lesson) {
        return new LessonModel(lesson).save();
    }

    static update(id, newObj) {
        return LessonModel.findByIdAndUpdate(id, newObj);
    }

    static getAll() {
        return LessonModel.find().sort({
            created: -1,
        });
    }

    static getById(id) {
        return LessonModel.findById(id);
    }

    static deleteById(id) {
        return LessonModel.findByIdAndDelete(id);
    }
}
module.exports = Lesson;
