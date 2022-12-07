const DepartController = require("../controller/depart");
const upload = require("../middleware/imageDepart");
const router = require("express").Router();

router.post("/",upload.any('photo'),DepartController.addDepart);
router.get("/",DepartController.getAllDepart);
router.put("/:id",DepartController.updateDepart);
router.put("/delete/:id",DepartController.deleteDepart);
router.put("/image/delete/:id",DepartController.deleteImage);
router.post("/image/update/:id",upload.array('photo'),DepartController.updateImage);

router.get("/:id",DepartController.getDepartDetail);



module.exports = router