const router = require("express").Router();
const {
  insert,
  getData,
  edit,
  deleteCategory,
} = require("../controller/category.controller");

router.post("/insert", insert);
router.get("/get", getData);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
