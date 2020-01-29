const express = require("express");
const { checkIdParam } = require("../../middleware/utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js");
const { checkBasicAuth } = require("../../middleware/utils.js");
const controllers = require("../../controllers/group/group.js");

const router = express.Router();
router.use(express.json());

router.get("/", checkBasicAuth, checkTeacher, controllers.getAll);

router.get('/:id', checkIdParam, controllers.getById);

router.post('/', checkBasicAuth, checkHeadTeacher, controllers.insert);

router.delete("/:id", checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.delete);

router.patch('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.patch);

router.put('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.update);

// TODO Advanced Routers
module.exports = router;
