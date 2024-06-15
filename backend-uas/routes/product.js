const router = require("express").Router();
const {
  insert,
  getAll,
  getById,
  edit,
  deleteProduct,
  addStocks,
  removeStocks,
} = require("../controller/product.controller");
const { upload } = require("../uploadconfig");

const uploadImage = upload.single("image"); // Image adalah nama fieldnya

router.post("/insert", uploadImage, insert);
router.get("/get", getAll);
router.get("/get/:id", getById);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteProduct);
router.post("/add/:id", addStocks);
router.post("/remove/:id", removeStocks);

module.exports = router;
