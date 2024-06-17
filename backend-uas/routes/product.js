const router = require("express").Router();
const {
  insert,
  getAll,
  getById,
  edit,
  deleteProduct,
  productsCount,
} = require("../controller/product.controller");
const { upload } = require("../uploadconfig");

const uploadImage = upload.single("image"); // Image adalah nama fieldnya

router.post("/insert", uploadImage, insert);
router.get("/get", getAll);
router.get("/get/:id", getById);
router.put("/edit/:id", uploadImage, edit);
router.delete("/delete/:id", deleteProduct);
router.get("/total-products", productsCount);

module.exports = router;
