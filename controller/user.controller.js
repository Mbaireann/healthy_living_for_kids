const User = require("../models/User.model");

module.exports.saveBioData = async (req, res, next) => {
  let email = res.locals.user.email;
  const { weight, height, gender, dob } = req.body;

  let w = parseInt(weight);
  let h = parseInt(height);

  try {
    await User.findOneAndUpdate(
      { email },
      { weight: w, height: h, gender: gender, birthday: new Date(dob) , hasBmr: true}
    );

    let doc = await User.findOne({ email });
    delete doc.password;
    delete doc._id;

    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};
