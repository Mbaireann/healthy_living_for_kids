var express = require("express");
var router = express.Router();
const authController = require("../controller/auth.controller");

router.get("/join", (req, res) => {
  res.render("join");
});
router.get("/checkAccount", (req, res) => {
  res.render("checkaccount");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post('/checkaccount',authController.check_account)
router.post("/join", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
