const router = require("express").Router();
const {
  insert,
  getData,
  edit,
  deleteCategory,
  getById,
} = require("../controller/category.controller");

router.post("/insert", insert);
router.get("/get", getData);
router.get("/get/:id", getById);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
