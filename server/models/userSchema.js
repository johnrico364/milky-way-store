const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const path = require("path");
const fs = require("fs");
const transporter = require("../middleware/emailConfig");
require("dotenv").config();

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    address: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

//signup
userSchema.statics.signup = async function (user, userImage) {
  const filePath = path.join("../client/src/images/user", userImage);

  //Validations
  if (!validator.isEmail(user.email)) {
    fs.unlink(filePath, (err) => console.log("Error"));
    throw Error("Invalid Email Format");
  }
  if (!validator.isStrongPassword(user.password)) {
    fs.unlink(filePath, (err) => console.log("Error"));
    throw Error(
      "Password must contains one capital letter and one special character"
    );
  }

  const exist = await this.findOne({ email: user.email });
  if (exist) {
    fs.unlink(filePath, (err) => console.log("Error"));
    throw Error("Email is already taken");
  }

  //Hashing and salting password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  const createUser = await this.create({ ...user, password: hash });

  return createUser;
};

//login
userSchema.statics.login = async function (user) {
  const checkEmail = await this.findOne({ email: user.email });
  if (!checkEmail) {
    throw Error("Email does not exist.");
  }

  const matchPass = await bcrypt.compare(user.password, checkEmail.password);
  if (!matchPass) {
    throw Error("Incorrect Password.");
  }

  return checkEmail;
};

//otp
userSchema.statics.sendOtp = async function (fname, email) {
  const randomOtp = Math.floor(Math.random() * 900000) + 100000;

  const sendOtp = {
    from: {
      name: "Say Lava Logistics",
      address: process.env.USER,
    },
    to: [email],
    subject: "Email Verification",
    html: `
        <h3> Hello ${fname}, your one-time password (OTP) is <i>${randomOtp}<i/>. Please
             use this code within the next 10 minutes to complete your verification 
             process. For your security, do not share this code with anyone. If you 
             did not request this OTP, please contact our support team immediately. 
        </h3>
        `,
  };

  try {
    await transporter.sendMail(sendOtp);
  } catch (error) {
    throw Error("Fail to send OTP");
  }

  return { otp: randomOtp, mess: "OTP sent successfully." };
};

module.exports = mongoose.model("User", userSchema);
