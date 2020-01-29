const express = require("express");
const { checkIdParam } = require("../../middleware/utils.js");
const { checkTeacher } = require("../../middleware/auth/basic.js");
const { checkBasicAuth } = require("../../middleware/utils.js");
const controllers = require("../../controllers/student/student.js");

const router = express.Router();
router.use(express.json());


router.get("/", controllers.getAll);

router.get('/:id', checkIdParam, controllers.getById);

router.post('/', checkBasicAuth, checkTeacher, controllers.insert);

router.delete("/:id", checkBasicAuth, checkTeacher, checkIdParam, controllers.delete);

router.patch('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.patch);

router.put('/:id', checkBasicAuth, checkTeacher, checkIdParam, controllers.update);


module.exports = router;
