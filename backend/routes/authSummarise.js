const express = require("express");
const router = express.Router();
const { summariseWithAI } = require("../controllers/summariseAIController");

router.post("/summary", summariseWithAI);

module.exports = router;
