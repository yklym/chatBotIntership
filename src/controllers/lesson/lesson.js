const Lesson = require("../../db/lesson.js");

const getAll = (req, res) => {
    Lesson.getAll().then(lessons => {
        res.status(200).json(lessons);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const getById = (req, res) => {
    const id = req.params.id;
    Lesson.getById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // console.log(err);
        // or should i use status 500?
        res.status(400).json(err);
    });
};

const insert = (req, res) => {
    let lessObj = null;
    try {
        lessObj = new Lesson(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }
    Lesson.insert(lessObj).then(resLes => {
        res.status(201).json(resLes);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
};

// ----------------------------------------------TODO check Teacher's id
const _delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ err: "No id parametr, or it is incorrect" });
        return;
    }
    Lesson.deleteById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // or should i use status 500?
        res.status(400).json(err);
    });
};

const patch = (req, res) => {
    const id = req.params.id;
    Lesson.update(id, req.body).then(resLes => {
        res.status(201).json(resLes);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
};

const update = (req, res) => {
    const id = req.params.id;
    let lessObj = null;
    try {
        lessObj = new Lesson(req.body);
        console.log(lessObj);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }
    Lesson.update(id, lessObj).then(resLes => {
        res.status(201).json(resLes);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
};
// --------------------------------------------------------------------


module.exports = {
    delete: _delete,
    getAll,
    getById,
    patch,
    update,
    insert,
};
