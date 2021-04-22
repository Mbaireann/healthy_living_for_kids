var express = require("express");
var router = express.Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");

const { requireAuth } = require("../middlewares/auth.middleware");

//User account checking
router.get("/checkAccount", (req, res) => {
  res.render("checkaccount");
});
router.post("/checkaccount", authController.check_account);

//user registration
router.get("/join", (req, res) => {
  res.render("join");
});
router.post("/join", authController.signup_post);

//user login
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", authController.login_post);

//user logout
router.get("/logout", authController.logout_get);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/* GET home page. */
router.get("/home", requireAuth, function (req, res, next) {
  if (res.locals.user.hasBmr) {
    res.render("home", { doc: res.locals.user });
  } else {
    res.redirect("/biodata");
  }
});
/* GET home page. */
router.get("/biodata", requireAuth, function (req, res, next) {
  console.log(res.locals.user.hasBmr);
  res.locals.user.hasBmr = false;
  if (!res.locals.user.hasBmr) {
    res.render("biodata");
  } else {
    res.redirect("/home");
  }
});
router.post("/biodata", userController.saveBioData);

module.exports = router;
