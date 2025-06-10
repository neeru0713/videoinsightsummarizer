const {
  getTranscript,
  createSummary,
} = require("../services/summariseService");

const Summary = require("../models/Summary");

const summariseWithAI = async (req, res) => {
  try {
    console.log(".....req.body",req.body)
    const { videoId } = req.body;

    const transcript = await getTranscript(videoId);
    const summary = await createSummary(transcript);

    const saved = await Summary.create({ videoId, summary });

    res.json({ summary: saved.summary });
  } catch (err) {
    console.error("Summarize error:", err);
    res.status(500).json({ message: "Failed to summarize video" });
  }
};

module.exports = { summariseWithAI };
