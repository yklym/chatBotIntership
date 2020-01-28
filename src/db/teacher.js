const TeacherModel = require('../models/teacherModel');
const { sha512 } = require("./../utils.js");

class Teacher {
    constructor({ fullname = "", username, password, age = 0, role = 0, lessons = [] }) {
        const salt = process.env.BASIC_AUTH_SALT;
        if (!salt) {
            throw new Error("Internal server error");
        }

        this.password = sha512(password, salt);
        this.username = username;
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

    static findByUsername(username) {
        return TeacherModel.findOne({
            username : username
        });
    }
}

module.exports = Teacher;
