const express = require("express");
const { checkIdParam, checkBasicAuth } = require("../../middleware/utils.js");
const { checkTeacher, checkHeadTeacher } = require("../../middleware/auth/basic.js");
const controllers = require("../../controllers/group/group.js");

const router = express.Router();

router.get("/", checkBasicAuth, checkTeacher, controllers.getAll);

router.get('/:id', checkBasicAuth, checkIdParam, checkTeacher, controllers.getById);

router.post('/', checkBasicAuth, checkHeadTeacher, controllers.insert);

router.delete("/:id", checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.delete);

router.patch('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.patch);

router.put('/:id', checkBasicAuth, checkHeadTeacher, checkIdParam, controllers.update);

// TODO Advanced Routers
module.exports = router;
