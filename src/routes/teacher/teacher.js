const express = require("express");
const Teacher = require("../../db/teacher.js");
const { checkIdParam, sha512 } = require("../../utils.js");

const router = express.Router();
router.use(express.json());


router.get("/", (req, res) => {
    Teacher.getAll().then(teachers => {
        res.status(200).json(teachers);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    Teacher.getById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.delete("/:id", checkIdParam, (req, res) => {
    const id = req.params.id;
    Teacher.deleteById(id).then(teacher => {
        res.status(200).json(teacher);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.patch('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    Teacher.update(id, req.body).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});

router.put('/:id', checkIdParam, (req, res) => {
    const id = req.params.id;
    let teachObj = null;
    try {
        teachObj = new Teacher(req.body);
        console.log(teachObj);
    } catch (err) {
        res.status(400).json({ err: "wrong request body" });
        return;
    }
    Teacher.update(id, teachObj).then(resTeach => {
        res.status(201).json(resTeach);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ err });
    });
});

router.post('/', (req, res) => {
    let teachObj = null;
    const salt = process.env.BASIC_AUTH_SALT;
    if (!salt) {
        res.status(500).json({ err: "internal server problem" });
    }

    req.body.password = sha512(req.body.password, salt);
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
