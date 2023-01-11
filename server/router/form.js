const FormController = require('../controller/form')
const router = require('express').Router()

router.post("/",FormController.addForm)
router.get("/",FormController.getAllForm)
router.get("/:id",FormController.getFormDetail)
router.delete("/:id",FormController.deleteForm)

module.exports = router