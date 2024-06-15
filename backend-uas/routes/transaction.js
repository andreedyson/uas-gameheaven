const router = require("express").Router();
const { insert, getAll } = require("../controller/transaction.controller");

router.post("/insert", insert);
router.get("/get", getAll);

module.exports = router;
