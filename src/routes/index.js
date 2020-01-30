const express = require("express");

const router = express.Router();
router.use(express.json());


const lessonsRoute = require("./lesson/lesson.js");
router.use("/lessons", lessonsRoute);

const teacherRoute = require("./teacher/teacher.js");
router.use("/teachers", teacherRoute);

const studentRoute = require("./student/student.js");
router.use("/students", studentRoute);

const groupRoute = require("./group/group.js");
router.use("/groups", groupRoute);


router.get('*', (req, res) => {
    res.status(404).json({ err: "wrong api route" });
});

// -----------------------------------------
module.exports = router;
