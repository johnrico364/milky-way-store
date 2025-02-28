const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const getAllUserAccounts = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json({ users });
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
  getAllUserAccounts
};
