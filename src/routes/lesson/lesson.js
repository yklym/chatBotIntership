const express = require("express");
const { checkIdParam, checkBasicAuth } = require("../../middleware/utils.js"); // check if query has id param
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js"); // checks authorized uzer's role
const controllers = require("../../controllers/lesson/lesson.js");

const router = express.Router();

router.get("/", checkBasicAuth, checkTeacher, controllers.getAll);

router.get('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.getById);

router.post('/', checkBasicAuth, checkTeacher, controllers.insert);


router.delete("/:id", checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.delete);

router.patch('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.patch);

router.put('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.update);

module.exports = router;
