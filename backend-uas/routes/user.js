const router = require("express").Router();
const {
  register,
  login,
  getAll,
  usersCount,
} = require("../controller/user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/get", getAll);
router.get("/total-users", usersCount);

module.exports = router;
