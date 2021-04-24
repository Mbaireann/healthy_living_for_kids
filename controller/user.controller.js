const User = require("../models/User.model");

module.exports.saveBioData = async (req, res, next) => {
  let email = res.locals.user.email;
  const { weight, height, gender, dob } = req.body;

  let w = parseInt(weight);
  let h = parseInt(height);

  try {
    await User.findOneAndUpdate(
      { email },
      {
        weight: w,
        height: h,
        gender: gender,
        birthday: new Date(dob),
        hasBmr: true,
      }
    );

    let doc = await User.findOne({ email });
    delete doc.password;
    delete doc._id;

    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUserStats = async (req, res) => {
  let { id } = req.params;

  const foundUser = User.findById(id);

  if (!foundUser) {
    res.status(400).json({ msg: "User not found" });
  }


};

