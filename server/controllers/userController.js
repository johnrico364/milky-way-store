const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validator = require("validator");

const transporter = require("../middleware/emailConfig");
const User = require("../models/userSchema");
const Order = require("../models/orderSchema");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res, next) => {
  const user = JSON.parse(req.body.user);
  const userImage = req?.file?.filename;

  if (userImage === undefined) {
    return res.status(400).json({ error: "Profile picture required" });
  }

  try {
    const userData = await User.signup(
      {
        ...user,
        isAdmin: false,
        isBlocked: false,
        picture: userImage,
      },
      userImage
    );

    const token = createToken(userData._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const user = req.body;

  try {
    const userData = await User.login(user);
    const token = createToken(userData._id);

    res.status(200).json({ isAdmin: userData.isAdmin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const otpSignupUser = async (req, res) => {
  const { fname, email } = req.body;

  try {
    const response = await User.sendOtp(fname, email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserdata = async (req, res) => {
  const token = req.params.token;

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const userData = await User.findOne({ _id });

    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authUserToken = async (req, res) => {
  const { authorization } = req.headers;

  !authorization &&
    res.status(401).json({ mess: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const userData = await User.findOne({ _id });

    if (_id) {
      res.status(200).json({ mess: true, isAdmin: userData.isAdmin });
    }
  } catch (error) {
    res.status(400).json({ mess: false });
  }
};

const updateUserProfile = async (req, res) => {
  const id = req.params.id;
  const newUser = JSON.parse(req.body.user);
  const userImg = req.file?.filename;
  const oldImg = JSON.parse(req.body.oldPic);

  console.log(newUser);

  try {
    const oldImagePath = path.join("../client/src/images/user", oldImg);

    if (newUser.newPassword) {
      // password validation
      if (!validator.isStrongPassword(newUser.newPassword)) {
        if (userImg) {
          const newImagePath = path.join("../client/src/images/user/", userImg);
          fs.unlink(newImagePath, (err) => console.log("deleted image"));
        }

        throw Error(
          "Password must 8 letters long, contains one capital letter, and one special character"
        );
      }

      //Hashing and salting password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.newPassword, salt);

      newUser.password = hash;
      delete newUser.newPassword;
    }

    if (userImg) fs.unlink(oldImagePath, (err) => console.log("deleted image"));

    const user = await User.findByIdAndUpdate(id, {
      ...newUser,
      picture: userImg,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUserAccounts = async (req, res) => {
  const status = req.params.status;

  let query = {};
  switch (status) {
    case "all":
      query = { isAdmin: false };
      break;
    case "blocked":
      query = { isAdmin: false, isBlocked: true };
  }

  try {
    const users = await User.find(query);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
};

const getUserOrderTransaction = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ ordered_by: userId, isConfirmed: true })
      .populate({
        path: "product",
        select: "name price",
      })
      .populate({
        path: "ordered_by",
        select: "fname lname",
      });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
};

const blockUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("email");

  const emailMess = {
    from: {
      name: "Milky Way E-Shop",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Account Blocked",
    html: `
      <div
        style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div
          style="
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          "
        >
          <h2>Account Notification</h2>
        </div>
        <div style="padding-top: 20px; color: #333333; line-height: 1.6">
          <p>Dear User,</p>

          <p>
            We wanted to inform you that
            <span style="color: #d9534f; font-weight: bold"
              >your account has been temporarily blocked</span
            >.
          </p>

          <p>
            This may be due to unusual activity or a violation of our terms of
            service. Our team is currently reviewing the situation and will
            restore access as soon as possible, if appropriate.
          </p>

          <p>
            If you believe this is a mistake or need further assistance, please
            contact our support team.
          </p>

          <p>Thank you for your understanding,</p>
          <p><strong>The Support Team</strong></p>
        </div>
        <div
          style="
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          "
        >
          &copy; 2025 Milky Way. All rights reserved.
        </div>
      </div>
    
    `,
  };

  try {
    await transporter.sendMail(emailMess);

    await User.findByIdAndUpdate(userId, {
      isBlocked: true,
      blockedAt: Date.now(),
    });

    res.status(200).json({ mess: "User was successfully blocked" });
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
};

const unblockUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("email");

  const emailMess = {
    from: {
      name: "Milky Way E-Shop",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Account Unblocked",
    html: `
      <div
        style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div
          style="
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          "
        >
          <h2>Account Update</h2>
        </div>
        <div style="padding-top: 20px; color: #333333; line-height: 1.6">
          <p>Dear User,</p>

          <p>
            We’re happy to inform you that
            <span style="color: #28a745; font-weight: bold"
              >your account has been unblocked</span
            >
            and full access has been restored.
          </p>

          <p>
            You can now log in and continue using our services as usual. We
            appreciate your patience and cooperation throughout the process.
          </p>

          <p>
            If you have any further questions or concerns, feel free to reach out
            to our support team at any time.
          </p>

          <p>Best regards,</p>
          <p><strong>The Support Team</strong></p>
        </div>
        <div
          style="
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
          "
        >
          &copy; 2025 Milky Way. All rights reserved.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(emailMess);

    await User.findByIdAndUpdate(userId, {
      isBlocked: false,
      blockedAt: null,
    });

    res.status(200).json({ mess: "User was successfully unblocked" });
  } catch (error) {
    res.status(400).json({ mess: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  otpSignupUser,
  getUserdata,
  authUserToken,
  updateUserProfile,
  getAllUserAccounts,
  getUserOrderTransaction,
  blockUser,
  unblockUser,
};
