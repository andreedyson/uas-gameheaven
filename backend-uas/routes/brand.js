const router = require("express").Router();
const {
  insert,
  getData,
  edit,
  deleteBrand,
  brandsCount,
} = require("../controller/brand.controller");

router.post("/insert", insert);
router.get("/get", getData);
router.put("/edit", edit);
router.delete("/delete", deleteBrand);
router.get("/total-brands", brandsCount);

module.exports = router;
