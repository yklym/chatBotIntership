const StudentModel = require('../models/studentModel');

class Student {
    constructor( grade = 1, fullname = "", lessons = []) {
        this.grade = grade;
        this.fullname = fullname;
        this.lessons = lessons;
    }

    static getAll() {
        return StudentModel.find().sort({ created: -1 }).catch((err) => console.log("err in getAll\n" + err));

    }

    static getById(id) {
        return StudentModel.findById(id);
    }

    static update(id, newObj) {
        return StudentModel.findByIdAndUpdate(id, newObj);
    }

    static insert(student) {
        return new StudentModel(student).save()
            .catch((err) => console.log("erro in user insert\n" + err));
    }

    static deleteById(id) {
        return StudentModel.findByIdAndDelete(id);
    }
    // static findManyById(idArray){
    //     let queryArray = idArray.map(el=>{
    //         return mongoose.Types.ObjectId(el);
    //     });
    //     return UserModel.find({
    //         '_id': { $in: queryArray }
    //     });
    // }
    static findByLogin(login) {
        return StudentModel.findOne({
            login: login
        });
    }

    static addSubsription(studId, lessonId) {
        return this.getById(studId)
            .then(st => {
                if (!st.subscribes.includes(lessonId)) {
                    st.subscribes.push(lessonId);
                }
                return this.update(studId, st);
            })
    }

    static deleteSubsription(studId, lessonId) {
        return this.getById(studId)
            .then(st => {
                if (st.subscribes.includes(lessonId)) {
                    st.subscribes.splice(st.subscribes.indexOf(lessonId), 1);
                }
                return this.update(studId, st);
            })
    }
}

// -----------------------------------------------------------------
module.exports = Student
// ------------------------------------------------------------------