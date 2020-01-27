const TeacherModel = require('../models/teacherModel');

class Teacher {
    constructor(fullname = "", age = -1, role = 0, lessons = []) {
        this.fullname = fullname;
        this.age = age;
        this.role = role;
        this.lessons = lessons;
    }

    static insert(teacher) {
        return new TeacherModel(teacher).save();
    }

    static update(id, newObj) {
        return TeacherModel.findByIdAndUpdate(id, newObj);
    }

    static getAll() {
        return TeacherModel.find().sort({
            created: -1,
        });
    }

    static getById(id) {
        return TeacherModel.findById(id);
    }

    static deleteById(id) {
        return TeacherModel.findByIdAndDelete(id);
    }
}

module.exports = Teacher;
