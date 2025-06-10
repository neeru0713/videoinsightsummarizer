
// Corrected import: Destructure fetchTranscript
const { fetchTranscript } = require("youtube-transcript");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getTranscript = async (videoId) => {
  // Ensure videoId is passed correctly
  const transcript = await fetchTranscript(videoId);
  return transcript.map((t) => t.text).join(" ");
};

const createSummary = async (transcript) => {
  // Check transcript length before slicing to avoid errors if it's too short
  const input =
    transcript.length > 10000 ? transcript.slice(0, 10000) : transcript;

  const response = await openai.chat.completions.create({
    model: "gpt-4", // Consider 'gpt-3.5-turbo' for faster and cheaper summaries if GPT-4 isn't strictly necessary.
    messages: [
      {
        role: "system",
        content: "Summarize the following YouTube transcript.",
      },
      { role: "user", content: input },
    ],
  });

  return response.choices[0].message.content;
};

// Corrected export: Export getTranscript, not Transcript
module.exports = { getTranscript, createSummary };
