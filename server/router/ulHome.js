const UlHomeController = require("../controller/ulHome");
const upload = require("../middleware/imageUlHome");
const router = require("express").Router();

router.post("/",upload.single('photo'),UlHomeController.addUlHome);
router.get("/",UlHomeController.getAllUlHome);
router.put("/:id",UlHomeController.deleteUlHome);




module.exports = router