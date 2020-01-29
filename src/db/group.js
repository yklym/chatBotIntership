const GroupModel = require('../models/groupModel');

class Group {
    constructor({ name = "", grade = 1, students = [] }) {
        this.name = name;
        this.grade = grade;
        this.students = students;
    }

    static insert(group) {
        return new GroupModel(group).save();
    }

    static update(id, newObj) {
        return GroupModel.findByIdAndUpdate(id, newObj);
    }

    static getAll() {
        return GroupModel.find().sort({
            created: -1,
        });
    }

    static getById(id) {
        return GroupModel.findById(id);
    }

    static deleteById(id) {
        return GroupModel.findByIdAndDelete(id);
    }
}

module.exports = Group;
