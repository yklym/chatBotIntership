const express = require("express");
const { checkIdParam, checkForLoginData, checkBasicAuth } = require("../../middleware/utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js");
const controllers = require("../../controllers/teacher/teacher.js");

const router = express.Router();

router.get("/me", checkBasicAuth, checkTeacher, controllers.getMe);

router.get("/", checkBasicAuth, checkHeadTeacher, controllers.getAll);

router.get('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.getById);

router.delete("/:id", checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.delete);

router.patch('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.patch);

router.put('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, checkForLoginData, controllers.update);

router.post('/', checkBasicAuth, checkHeadTeacher, checkForLoginData, controllers.insert);

module.exports = router;
