const StudentModel = require('../models/studentModel');

class Student {
    constructor({ fullname = "", age = 0, mark = 0, lessons = [] }) {
        this.fullname = fullname;
        this.lessons = lessons;
        this.mark = mark;
        this.age = age;
    }

    static getAll() {
        return StudentModel.find().sort({ created: -1 });
    }

    static getById(id) {
        return StudentModel.findById(id);
    }

    static update(id, newObj) {
        return StudentModel.findByIdAndUpdate(id, newObj);
    }

    static insert(student) {
        return new StudentModel(student).save();
    }

    static deleteById(id) {
        return StudentModel.findByIdAndDelete(id);
    }

    static addSubsription(studId, lessonId) {
        return this.getById(studId)
            .then(st => {
                if (!st.lessons.includes(lessonId)) {
                    st.lessons.push(lessonId);
                }
                return this.update(studId, st);
            });
    }

    static deleteSubsription(studId, lessonId) {
        return this.getById(studId)
            .then(st => {
                if (st.lessons.includes(lessonId)) {
                    st.lessons.splice(st.lessons.indexOf(lessonId), 1);
                }
                return this.update(studId, st);
            });
    }
}

module.exports = Student;
