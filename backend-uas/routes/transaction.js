const router = require("express").Router();
const {
  insert,
  getAll,
  highest,
  transactionsCount,
  edit,
  getById,
  deleteTransaction,
} = require("../controller/transaction.controller");

router.post("/insert", insert);
router.get("/get", getAll);
router.get("/get/:id", getById);
router.get("/highest", highest);
router.get("/total-transactions", transactionsCount);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteTransaction);

module.exports = router;
