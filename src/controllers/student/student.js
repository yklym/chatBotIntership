const Student = require("../../db/student.js");


const getAll = (req, res) => {
    Student.getAll().then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const getById = (req, res) => {
    const id = req.params.id;
    Student.getById(id).then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const insert = (req, res) => {
    let studObj = null;
    try {
        studObj = new Student(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request bod" });
        return;
    }
    Student.insert(studObj).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const _delete = (req, res) => {
    const id = req.params.id;
    Student.deleteById(id).then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const patch = (req, res) => {
    const id = req.params.id;
    Student.update(id, req.body).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const update = (req, res) => {
    const id = req.params.id;
    let lessObj = null;
    try {
        lessObj = new Student(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request bod" });
        return;
    }
    Student.update(id, lessObj).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(500).json(err);
    });
};


module.exports = {
    delete: _delete,
    insert,
    getAll,
    getById,
    update,
    patch,
};
