const express = require("express");
const multer = require("multer");
const Controllers = require("../controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/src/images/user");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + ".png");
  },
});

const upload = multer({ storage });

router.post("/signup", upload.single("image"), Controllers.signupUser);
router.post("/login", Controllers.loginUser);
router.post("/signup/otp", Controllers.otpSignupUser); //user
router.get("/user-data/:token", Controllers.getUserdata); //user
router.get("/auth-token", Controllers.authUserToken); //user
router.get("/get/all-accounts", Controllers.getAllUserAccounts); //admin

module.exports = router;
