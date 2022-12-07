const ServiceController = require("../controller/service");
const upload = require("../middleware/imageService");
const router = require("express").Router();

router.post("/",upload.single('photo'),ServiceController.addService);
router.get("/",ServiceController.getAllServices);
router.put("/:id",ServiceController.deleteServices);




module.exports = router