
// Corrected import: Destructure fetchTranscript
const { YoutubeTranscript } = require("youtube-transcript");
const Summary = require("../models/Summary");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const getTranscript = async (videoId) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, `${videoId}.en.vtt`);
    const command = `yt-dlp --write-auto-sub --sub-lang en --skip-download --sub-format vtt -o "${videoId}.%(ext)s" https://www.youtube.com/watch?v=${videoId}`;

    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error("yt-dlp error:", error);
        return reject("Failed to get transcript");
      }

      // Read generated VTT file
      fs.readFile(outputPath, "utf8", (err, data) => {
        if (err) {
          console.error("File read error:", err);
          return reject("Transcript file not found");
        }

        // Remove VTT metadata and return just text lines
        const text = data
          .split("\n")
          .filter(line => line && !line.includes("-->") && !line.startsWith("WEBVTT"))
          .join(" ");
        
        // Clean up the file
        fs.unlinkSync(outputPath);

        resolve(text);
      });
    });
  });
};


function cleanTranscript(raw) {
  return raw
    .replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, "") // Remove timestamps
    .replace(/<\/?c>/g, "")                    // Remove <c> tags
    .replace(/\s+/g, " ")                      // Normalize whitespace
    .trim();
}


const summarizeTranscript = async (videoId) => {
  // Check db
  const transcript = await getTranscript(videoId);
  const readableTranscript = cleanTranscript(transcript);

  const existing = await Summary.findOne({ videoId });
  console.log("existing :", existing)
  if (existing) return existing.summary;

  // Call Gemini API
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: `Summarize this YouTube transcript:\n\n${readableTranscript}` }],
        },
      ],
    }
  );

  // console.log("res : ", response, response.data.candidates);

  const summary = response.data.candidates[0].content.parts[0].text;

  // Save to DB
  await Summary.create({ videoId, summary });

  return summary;
};

// Corrected export: Export getTranscript, not Transcript
module.exports = { getTranscript, summarizeTranscript };
