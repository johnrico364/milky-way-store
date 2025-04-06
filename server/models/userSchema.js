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
    isBlocked: { type: Boolean, required: true },
    blockedAt: { type: Number },
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
  console.log(user);

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
      name: "Milky Way E-Shop",
      address: process.env.USER,
    },
    to: [email],
    subject: "Email Verification",
    html: `
        <div
          style="
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          "
        >
          <div
            style="
              font-size: 32px;
              font-weight: 800;
              letter-spacing: 1px;
              color: #124e73;
              margin-bottom: 20px;
            "
          >
            Milky Way E-Shop
          </div>
          <p class="message">
            Hello ${fname}, use the OTP below to verify your email address. This
            OTP is valid for 5 minutes.
          </p>
          <div
            style="
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 1px;
              color: #0a0a5d;
              padding: 10px;
              border: 2px dashed #124e73;
              display: inline-block;
              margin: 20px 0;
            "
          >
            ${randomOtp}
          </div>
          <p style="font-size: 16px; color: #555; margin-bottom: 20px">
            If you did not request this, please ignore this email.
          </p>
          <div style="font-size: 12px; color: #777; margin-top: 20px">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
        `,
  };

  try {
    await transporter.sendMail(sendOtp);
  } catch (error) {
    throw Error("Fail to send OTP");
  }

  return {
    otp: randomOtp,
    mess: "OTP sent successfully. Please check also in your spams",
  };
};

module.exports = mongoose.model("User", userSchema);
