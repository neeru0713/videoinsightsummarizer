const express = require("express");
const router = express.Router();
const {
  videoDetailsController,
} = require("../controllers/videoDetailsController");

router.post("/", videoDetailsController);

module.exports = router;
