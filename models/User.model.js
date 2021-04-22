const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  fullname: { type: String, require: [true, "Please enter your full names"] },
  birthday: {
    type: Date,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  bmr: {
    type: Number,
  },
  hasBmr:{
    type: Boolean,
    default:false
  }
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const data = this.getUpdate();

  let currentYear = new Date().getFullYear();

  let currentAge = currentYear - data.birthday.getFullYear();

  if (this.gender === "M") {
    data.bmr = Math.floor(
      66.47 + 13.75 * data.weight + 5.003 * data.height - 6.755 * currentAge
    );
  } else {
    data.bmr = Math.floor(
      655 + 9.563 * data.weight + 1.85 * data.height - 4.676 * currentAge
    );
  }

  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
