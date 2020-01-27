const express = require("express");
const busboyBodyParser = require('busboy-body-parser');
const Lesson = require("../../db/lesson.js");
const { checkIdParam } = require("../../utils.js");
const router = express.Router();
router.use(express.json());


router.use(busboyBodyParser({
    limit: '5mb',
}));


router.get("/", (req, res) => {
    Lesson.getAll().then(lessons => {
        res.status(200).json(lessons);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    Lesson.getById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // console.log(err);
        // or should i use status 500?
        res.status(400).json(err);
    });
});

router.delete("/:id", checkIdParam, (req, res) => {
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

router.patch('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    Lesson.update(id, req.body).then(resLes => {
        res.status(201).json(resLes);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});

router.put('/:id', checkIdParam,(req, res) => {
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

router.post('/', (req, res) => {
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


// PATCH
module.exports = router;
