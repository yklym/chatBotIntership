const express = require("express");
const passport = require("passport");
const Student = require("../../db/student.js");
const { checkIdParam } = require("../../utils.js");
const { checkTeacher } = require("../../auth/basic.js");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
    Student.getAll().then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    Student.getById(id).then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post('/', passport.authenticate('basic', { session: false }), checkTeacher, (req, res) => {
    let studObj = null;
    try {
        studObj = new Student(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }
    Student.insert(studObj).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(400).json({ err });
    });
});

router.delete("/:id", passport.authenticate('basic', { session: false }), checkTeacher, checkIdParam, (req, res) => {
    const id = req.params.id;
    Student.deleteById(id).then(students => {
        res.status(200).json(students);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.patch('/:id', passport.authenticate('basic', { session: false }), checkTeacher, checkIdParam, (req, res) => {
    const id = req.params.id;
    Student.update(id, req.body).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(400).json({ err });
    });
});

router.put('/:id', passport.authenticate('basic', { session: false }), checkTeacher, checkIdParam, (req, res) => {
    const id = req.params.id;
    let lessObj = null;
    try {
        lessObj = new Student(req.body);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }
    Student.update(id, lessObj).then(resStud => {
        res.status(201).json(resStud);
    }).catch(err => {
        res.status(400).json({ err });
    });
});

// TODO Advanced Routers
module.exports = router;
