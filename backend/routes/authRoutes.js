const express = require("express");
const router = express.Router();
const { signupController } = require("../controllers/signupController");
const { signinController } = require("../controllers/signinController");

router.post("/signup", signupController);
router.post("/signin", signinController);

module.exports = router;
