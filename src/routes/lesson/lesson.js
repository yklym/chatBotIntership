const express = require("express");
const Lesson = require("../../db/lesson.js");

const router = express.Router();
router.use(express.json());


router.get("/", (req, res) => {
    Lesson.getAll().then(lessons => {
        res.status(200).json(lessons);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    const [id] = req.params;
    Lesson.getById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // or should i use status 500?
        res.status(404).json(err);
    });
});

router.delete("/:id", (req, res) => {
    const [id] = req.params;
    Lesson.getById(id).then(lesson => {
        res.status(200).json(lesson);
    }).catch(err => {
        // or should i use status 500?
        res.status(404).json(err);
    });
});



// -----------------------------------------
module.exports = router;