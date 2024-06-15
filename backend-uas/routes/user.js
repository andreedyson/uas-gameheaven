const router = require("express").Router();
const { register, login, getAll } = require("../controller/user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/get", getAll);

module.exports = router;
