const { summarizeTranscript } = require("../services/summariseService");

const getSummary = async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: "videoId are required" });
  }

  try {
    const summary = await summarizeTranscript(videoId);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to summarize", details: err.message });
  }
};

module.exports = { getSummary };
