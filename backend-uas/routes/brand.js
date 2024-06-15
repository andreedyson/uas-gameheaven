const router = require("express").Router();
const {
  insert,
  getData,
  edit,
  deleteBrand,
} = require("../controller/brand.controller");

router.post("/insert", insert);
router.get("/get", getData);
router.put("/edit", edit);
router.delete("/delete", deleteBrand);

module.exports = router;
