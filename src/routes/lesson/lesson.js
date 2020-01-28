const express = require("express");
const passport = require("passport");
const Lesson = require("../../db/lesson.js");
const { checkIdParam } = require("../../utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../auth/basic.js");

const router = express.Router();
router.use(express.json());

router.get("/", passport.authenticate('basic', { session: false }), checkTeacher, (req, res) => {
    console.log(req.user);
    Lesson.getAll().then(lessons => {
        res.status(200).json(lessons);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', passport.authenticate('basic', { session: false }), checkTeacher, checkIdParam, (req, res) => {
    const id = req.params.id;
    Lesson.getById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // console.log(err);
        // or should i use status 500?
        res.status(400).json(err);
    });
});

router.post('/', passport.authenticate('basic', { session: false }), checkTeacher, (req, res) => {
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
});

// ----------------------------------------------TODO check Teacher's id
router.delete("/:id", passport.authenticate('basic', { session: false }), checkHeadTeacher, checkIdParam, (req, res) => {
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
});

router.patch('/:id', passport.authenticate('basic', { session: false }), checkHeadTeacher, checkIdParam, (req, res) => {
    const id = req.params.id;
    Lesson.update(id, req.body).then(resLes => {
        res.status(201).json(resLes);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});

router.put('/:id', passport.authenticate('basic', { session: false }), checkTeacher, checkIdParam, (req, res) => {
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
});
// --------------------------------------------------------------------
module.exports = router;
