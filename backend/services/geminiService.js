
const summarizeTranscript = async (transcript, videoId) => {
  // Check cache
  const existing = await Summary.findOne({ videoId });
  if (existing) return existing.summary;

  // Call Gemini API
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: `Summarize this YouTube transcript:\n\n${transcript}` }],
        },
      ],
    }
  );

  const summary = response.data.candidates[0].content.parts[0].text;

  // Save to DB
  await Summary.create({ videoId, summary });

  return summary;
};

module.exports = { summarizeTranscript };
