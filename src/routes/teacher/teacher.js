const express = require("express");
const passport = require("passport");
const Teacher = require("../../db/teacher.js");
const { checkIdParam } = require("../../utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../auth/basic.js");

const router = express.Router();
router.use(express.json());

router.get("/me", passport.authenticate('basic', { session: false }), checkTeacher, (req, res) => {
    Teacher.findByUsername(req.user.username).then(teacher => {
        // TODO delete odd fields e.g. _v, _id, password
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get("/", passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
    Teacher.getAll().then(teachers => {
        res.status(200).json(teachers);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// ------------------------------------------------ CHeck Id
router.get('/:id', checkIdParam, passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
    const id = req.params.id;
    Teacher.getById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.delete("/:id", checkIdParam, passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
    const id = req.params.id;
    Teacher.deleteById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.patch('/:id', checkIdParam, passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
    const id = req.params.id;
    Teacher.update(id, req.body).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});

router.put('/:id', checkIdParam, passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
    const id = req.params.id;
    let teachObj = null;
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ err: "Put request must have username and password fields!" });
        return;
    }

    try {
        teachObj = new Teacher(req.body);
        console.log(teachObj);
    } catch (err) {
        res.status(400).json({ err });
        return;
    }
    Teacher.update(id, teachObj).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});
// -----------------------------------------------------------
router.post('/', passport.authenticate('basic', { session: false }), checkHeadTeacher, (req, res) => {
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
});

module.exports = router;
