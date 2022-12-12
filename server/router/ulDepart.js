const UlDepartController = require("../controller/ulDepart");
const upload = require("../middleware/imageUlDepart");
const router = require("express").Router();

router.post("/",upload.single('photo'),UlDepartController.addUlDepart);
router.get("/",UlDepartController.getAllUlDepart);
router.put("/:id",UlDepartController.deleteUlDepart);




module.exports = router