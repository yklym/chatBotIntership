const Teacher = require("../../db/teacher.js");
const { sha512 } = require("../../utils/utils.js");

const getMe = (req, res) => {
    Teacher.findByUsername(req.user.username).then(teacher => {
        // TODO delete odd fields e.g. _v, _id, password
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const getAll = (req, res) => {
    Teacher.getAll().then(teachers => {
        res.status(200).json(teachers);
    }).catch(err => {
        res.status(500).json(err);
    });
};

// ------------------------------------------------ CHeck Id
const getById = (req, res) => {
    const id = req.params.id;
    Teacher.getById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
};

const _delete = (req, res) => {
    const id = req.params.id;
    Teacher.deleteById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
};

const patch = (req, res) => {
    const id = req.params.id;
    if (req.body.password) {
        req.body.password = sha512(req.body.password, process.env.PASS_HASH_SALT);
    }

    Teacher.update(id, req.body).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        res.status(400).json({ err });
    });
};

const update = (req, res) => {
    const id = req.params.id;
    let teachObj = null;
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ err: "Put request must have username and password fields!" });
        return;
    }
    try {
        teachObj = new Teacher(req.body);
    } catch (err) {
        res.status(400).json({ err });
        return;
    }
    Teacher.update(id, teachObj).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        res.status(400).json({ err });
    });
};
// -----------------------------------------------------------
const insert = (req, res) => {
    let teachObj = null;

    if (!req.body.username || !req.body.password) {
        res.status(400).json({ err: "Put request must have username and password fields!" });
        return;
    }

    try {
        teachObj = new Teacher(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }

    Teacher.insert(teachObj).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
};

module.exports = {
    getMe,
    getAll,
    getById,
    insert,
    delete: _delete,
    patch,
    update,
};
