const express = require("express");
const Teacher = require("../../db/teacher.js");
const { checkIdParam } = require("../../middleware/utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js");
const { checkBasicAuth } = require("../../middleware/utils.js");
const controllers = require("../../controllers/teacher/teacher.js");

const router = express.Router();
router.use(express.json());

router.get("/me", checkBasicAuth, checkTeacher, controllers.getMe);

router.get("/", checkBasicAuth, checkHeadTeacher, controllers.getAll);

// ------------------------------------------------ CHeck Id
router.get('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.getById);

router.delete("/:id", checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.delete);

router.patch('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.patch);

router.put('/:id', checkIdParam, checkBasicAuth, checkHeadTeacher, controllers.update);
// -----------------------------------------------------------
router.post('/', checkBasicAuth, checkHeadTeacher, controllers.insert);

module.exports = router;
