const express = require("express");

const router = express.Router();
router.use(express.json());


const lessonsRoute = require("./lesson/lesson.js");

router.use("/lessons", lessonsRoute);

const teacherRoute = require("./teacher/teacher.js");

router.use("/teachers", teacherRoute);

const studentRoute = require("./student/student.js");

router.use("/students", studentRoute);



// -----------------------------------------
module.exports = router;
