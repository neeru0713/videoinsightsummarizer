const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/summariseAIController");

router.post("/", getSummary);

module.exports = router;
