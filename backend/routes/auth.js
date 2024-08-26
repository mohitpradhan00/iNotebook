const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

//// ROUTE:1 Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid E-mail").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //// If there are errors, return Bad request and the errors
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
      return res.status(400).json({ success, error: error.array() });
    }
    try {
      //// Check whether the user with this email exists already
      const { name, email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry a user with this email is already exists" });
      }
      //// Securing password through hash and salt
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      //// Create a new user
      user = await User.create({
        name: name,
        email: email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      var authToken = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
      success = true;
      res.json({success, authToken});
      // res.json(user)
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//// ROUTE:2 login a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    //// If there are errors, return Bad request and the errors
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
      return res.status(400).json({ success, error: error.array() });
    }
    try {
      //// Check whether the user with this email exists already
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      //// Check password is correct or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: { id: user.id },
      };
      var authToken = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//// ROUTE:3 Get logged-in user details: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
