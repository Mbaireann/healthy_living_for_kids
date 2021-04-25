const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const config = require("config");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (!token) {
    res.redirect("checkaccount");
  }

  jwt.verify(token, config.get("app.jwt-token"), (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.redirect("/checkaccount");
    } else {
      next();
    }
  });
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      config.get("app.jwt-token"),
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.redirect("/checkAccount");
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
