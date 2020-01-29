const express = require("express");
const { checkIdParam } = require("../../middleware/utils.js"); // check if query has id param
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js"); // checks authorized uzer's role
const { checkBasicAuth } = require("../../middleware/utils.js");
const controllers = require("../../controllers/lesson/lesson.js");

const router = express.Router();
router.use(express.json());

router.get("/", checkBasicAuth, checkTeacher, controllers.getAll);

router.get('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.getById);

router.post('/', checkBasicAuth, checkTeacher, controllers.insert);

// ----------------------------------------------TODO check Teacher's id
router.delete("/:id", checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.delete);

router.patch('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.patch);

router.put('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.update);
// --------------------------------------------------------------------


module.exports = router;
