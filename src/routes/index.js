const express = require("express");

const router = express.Router();
router.use(express.json());


const lessonsRoute = require("./lesson/lesson.js");

router.use("/lessons", lessonsRoute);

const teacherRoute = require("./teacher/teacher.js");

router.use("/teacher", teacherRoute);


// -----------------------------------------
module.exports = router;
