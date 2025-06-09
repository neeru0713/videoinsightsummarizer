// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  signupController,
  signinController,
 
} = require("../controllers/authController");

router.post("/auth/signup", signupController);
router.post("/auth/signin", signinController);


module.exports = router;
